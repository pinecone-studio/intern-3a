import { graphql } from '@octokit/graphql';
import fs from 'node:fs';
import path from 'node:path';

type PullRequest = {
  createdAt: string;
  mergedAt: string | null;
  updatedAt: string;
  additions: number;
  deletions: number;
  author: { login: string } | null;
  commits: { totalCount: number } | null;
}

type UserMetrics = {
  username: string;
  prs_opened: number;
  prs_merged: number;
  commits: number;
  additions: number;
  deletions: number;
}

type GraphQLResponse = {
  repository: {
    pullRequests: {
      pageInfo: { hasNextPage: boolean; endCursor: string | null };
      nodes: PullRequest[];
    };
  };
}

const { GITHUB_TOKEN, OWNER, REPO, START_DATE, END_DATE, KV_KEY } = process.env;

// Debug (never print secrets)
const present = (v: string | undefined): string => (v && v.length > 0 ? '✅' : '❌');
console.log('[env] OWNER:', OWNER);
console.log('[env] REPO:', REPO);
console.log('[env] START_DATE:', START_DATE);
console.log('[env] END_DATE:', END_DATE);
console.log('[env] KV_KEY:', KV_KEY);
console.log('[env] GITHUB_TOKEN present:', present(GITHUB_TOKEN));

// Fail fast
const missing: string[] = [];
if (!GITHUB_TOKEN) missing.push('GITHUB_TOKEN');
if (!OWNER) missing.push('OWNER');
if (!REPO) missing.push('REPO');
if (!START_DATE) missing.push('START_DATE');
if (!END_DATE) missing.push('END_DATE');
if (!KV_KEY) missing.push('KV_KEY');
if (missing.length) {
  console.error('Missing required env vars:', missing.join(', '));
  process.exit(1);
}

const startMs = new Date(START_DATE!).getTime();
const endMs = new Date(END_DATE!).getTime();
if (Number.isNaN(startMs) || Number.isNaN(endMs)) {
  console.error('START_DATE or END_DATE is not a valid ISO date string');
  process.exit(1);
}
if (startMs > endMs) {
  console.error('START_DATE must be <= END_DATE');
  process.exit(1);
}

const client = graphql.defaults({
  headers: { authorization: `token ${GITHUB_TOKEN}` },
});

const QUERY = `
  query($owner: String!, $repo: String!, $cursor: String) {
    repository(owner: $owner, name: $repo) {
      pullRequests(
        first: 100,
        after: $cursor,
        orderBy: { field: UPDATED_AT, direction: DESC },
        states: [OPEN, CLOSED, MERGED]
      ) {
        pageInfo { hasNextPage endCursor }
        nodes {
          createdAt
          mergedAt
          updatedAt
          additions
          deletions
          author { login }
          commits { totalCount }
        }
      }
    }
  }
`;

const inWindow = (iso: string | null): boolean => {
  if (!iso) return false;
  const t = new Date(iso).getTime();
  return t >= startMs && t <= endMs;
};

async function main(): Promise<void> {
  const perUser = new Map<string, UserMetrics>();
  let cursor: string | null = null;
  let stopSoon = false;

  let pages = 0;
  let prsScanned = 0;
  let prsRelevant = 0;

  while (true) {
    pages += 1;
    const data = (await client(QUERY, { owner: OWNER, repo: REPO, cursor })) as GraphQLResponse;
    const conn = data.repository.pullRequests;

    console.log(`[scan] page ${pages} — received ${conn.nodes.length} PRs`);

    for (const pr of conn.nodes) {
      prsScanned += 1;

      const login = pr.author?.login;
      if (!login) continue;
      if (login.endsWith('[bot]')) continue;

      const openedInWindow = inWindow(pr.createdAt);
      const mergedInWindow = inWindow(pr.mergedAt);

      if (!openedInWindow && !mergedInWindow) continue;
      prsRelevant += 1;

      const user = perUser.get(login) ?? {
        username: login,
        prs_opened: 0,
        prs_merged: 0,
        commits: 0,
        additions: 0,
        deletions: 0,
      };

      if (openedInWindow) user.prs_opened += 1;

      // Credit ONLY merged PRs for commits/additions/deletions
      if (mergedInWindow) {
        user.prs_merged += 1;
        user.commits += pr.commits?.totalCount ?? 0;
        user.additions += pr.additions ?? 0;
        user.deletions += pr.deletions ?? 0;
      }

      perUser.set(login, user);

      // Early stop: PRs are ordered by UPDATED_AT DESC
      if (new Date(pr.updatedAt).getTime() < startMs) stopSoon = true;
    }

    if (!conn.pageInfo.hasNextPage) break;
    cursor = conn.pageInfo.endCursor;
    if (stopSoon) break;
  }

  const results = Array.from(perUser.values()).sort((a, b) => {
    if (b.prs_merged !== a.prs_merged) return b.prs_merged - a.prs_merged;
    return b.commits - a.commits;
  });

  console.log(`[done] scanned PRs: ${prsScanned}, relevant PRs: ${prsRelevant}, users: ${results.length}`);

  const out = {
    key: KV_KEY,
    owner: OWNER,
    repo: REPO,
    window: { start: START_DATE, end: END_DATE },
    generatedAt: new Date().toISOString(),
    results,
  };

  // Write to repo root metrics folder
  const metricsDir = path.join(process.cwd(), 'metrics');
  fs.mkdirSync(metricsDir, { recursive: true });
  fs.writeFileSync(path.join(metricsDir, 'intern-metrics.json'), JSON.stringify(out, null, 2));
  console.log('✅ Wrote metrics/intern-metrics.json');
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
