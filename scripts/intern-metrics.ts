import { graphql } from '@octokit/graphql';
import fs from 'node:fs';
import path from 'node:path';

type PullRequest = {
  createdAt: string;
  mergedAt: string | null;
  updatedAt: string;
  additions: number;
  deletions: number;
  author: { login: string; url: string; avatarUrl: string; email: string | null } | null;
  commits: { totalCount: number } | null;
};

type DayStatus = 'none' | 'pr' | 'merged';

type DayData = {
  status: DayStatus;
  prs_opened: number;
  prs_merged: number;
  commits: number;
};

type LeaderboardEntry = {
  rank: number;
  username: string;
  avatar_url: string;
  profile_url: string;
  prs_merged: number;
  commits: number;
  additions: number;
  deletions: number;
};

type GraphQLResponse = {
  repository: {
    pullRequests: {
      pageInfo: { hasNextPage: boolean; endCursor: string | null };
      nodes: PullRequest[];
    };
  };
};

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
          author { login url avatarUrl ... on User { email } }
          commits { totalCount }
        }
      }
    }
  }
`;

// Convert UTC to Asia/Ulaanbaatar (UTC+8) and extract date
const toDateKey = (iso: string): string => {
  const date = new Date(iso);
  return date.toLocaleDateString('en-CA', { timeZone: 'Asia/Ulaanbaatar' }); // "2026-01-15" format
};

const inWindow = (iso: string | null): boolean => {
  if (!iso) return false;
  const t = new Date(iso).getTime();
  return t >= startMs && t <= endMs;
};

type UserData = {
  avatar_url: string;
  profile_url: string;
  prs_merged: number;
  commits: number;
  additions: number;
  deletions: number;
  days: Record<string, { prs_opened: number; prs_merged: number; commits: number }>;
};

async function main(): Promise<void> {
  const users: Record<string, UserData> = {};

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

      // Initialize user if needed
      if (!users[login]) {
        users[login] = {
          avatar_url: pr.author?.avatarUrl ?? `https://github.com/${login}.png`,
          profile_url: pr.author?.url ?? `https://github.com/${login}`,
          prs_merged: 0,
          commits: 0,
          additions: 0,
          deletions: 0,
          days: {},
        };
      }

      const user = users[login];

      // Track PR opened (by createdAt date)
      if (openedInWindow) {
        const date = toDateKey(pr.createdAt);
        if (!user.days[date]) user.days[date] = { prs_opened: 0, prs_merged: 0, commits: 0 };
        user.days[date].prs_opened += 1;
      }

      // Track merged PR stats (by mergedAt date)
      if (mergedInWindow) {
        const date = toDateKey(pr.mergedAt!);
        if (!user.days[date]) user.days[date] = { prs_opened: 0, prs_merged: 0, commits: 0 };

        const commits = pr.commits?.totalCount ?? 0;
        user.days[date].prs_merged += 1;
        user.days[date].commits += commits;

        user.prs_merged += 1;
        user.commits += commits;
        user.additions += pr.additions ?? 0;
        user.deletions += pr.deletions ?? 0;
      }

      // Early stop: PRs are ordered by UPDATED_AT DESC
      if (new Date(pr.updatedAt).getTime() < startMs) stopSoon = true;
    }

    if (!conn.pageInfo.hasNextPage) break;
    cursor = conn.pageInfo.endCursor;
    if (stopSoon) break;
  }

  // Build leaderboard (sorted by prs_merged desc, then commits desc)
  const leaderboard: LeaderboardEntry[] = Object.entries(users)
    .map(([username, data]) => ({
      rank: 0,
      username,
      avatar_url: data.avatar_url,
      profile_url: data.profile_url,
      prs_merged: data.prs_merged,
      commits: data.commits,
      additions: data.additions,
      deletions: data.deletions,
    }))
    .sort((a, b) => {
      if (b.prs_merged !== a.prs_merged) return b.prs_merged - a.prs_merged;
      return b.commits - a.commits;
    })
    .map((entry, i) => ({ ...entry, rank: i + 1 }));

  // Build calendar: { username: { "2026-01-15": { status, prs_opened, prs_merged, commits } } }
  const calendar: Record<string, Record<string, DayData>> = {};

  for (const [username, data] of Object.entries(users)) {
    calendar[username] = {};

    // Sort dates for this user
    const sortedDates = Object.keys(data.days).sort();
    for (const date of sortedDates) {
      const day = data.days[date];
      let status: DayStatus = 'none';
      if (day.prs_merged > 0) {
        status = 'merged';
      } else if (day.prs_opened > 0) {
        status = 'pr';
      }
      calendar[username][date] = {
        status,
        prs_opened: day.prs_opened,
        prs_merged: day.prs_merged,
        commits: day.commits,
      };
    }
  }

  console.log(`[done] scanned PRs: ${prsScanned}, relevant PRs: ${prsRelevant}, users: ${leaderboard.length}`);

  const out = {
    key: KV_KEY,
    owner: OWNER,
    repo: REPO,
    window: { start: START_DATE, end: END_DATE },
    generatedAt: new Date().toISOString(),
    leaderboard, // Sorted array with rank, username, avatar_url, profile_url, stats
    calendar, // { username: { "2026-01-15": { status, prs_opened, prs_merged, commits } } }
  };

  // Write to repo root metrics folder
  const scriptDir = path.dirname(new URL(import.meta.url).pathname);
  const repoRoot = path.join(scriptDir, '..');
  const metricsDir = path.join(repoRoot, 'metrics');
  fs.mkdirSync(metricsDir, { recursive: true });
  fs.writeFileSync(path.join(metricsDir, 'intern-metrics.json'), JSON.stringify(out, null, 2));
  console.log('✅ Wrote metrics/intern-metrics.json');
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
