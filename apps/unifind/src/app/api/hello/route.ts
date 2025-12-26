import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const scores: { subject_id: number; score: number }[] = body.scores;

    if (!scores || scores.length === 0) {
      return NextResponse.json({ error: 'Онооны мэдээлэл алга' }, { status: 400 });
    }

    const values: number[] = [];
    const userScoresSQL = scores
      .map((s, i) => {
        values.push(s.subject_id, s.score);
        const idx = i * 2;
        return `SELECT $${idx + 1}::int AS subject_id, $${idx + 2}::int AS score`;
      })
      .join(' UNION ALL ');

    const query = `
      WITH user_scores AS (
        ${userScoresSQL}
      )
      SELECT
        u.id   AS university_id,
        u.name AS university_name,
        m.id   AS major_id,
        m.name AS major_name
      FROM majors m
      JOIN universities u ON m.university_id = u.id
      JOIN major_requirements r ON r.major_id = m.id
      JOIN user_scores us ON us.subject_id = r.subject_id
      WHERE us.score >= r.min_score
      GROUP BY u.id, u.name, m.id, m.name
      HAVING COUNT(*) = (
        SELECT COUNT(*)
        FROM major_requirements r2
        WHERE r2.major_id = m.id
      )
      ORDER BY u.name, m.name;
    `;

    const result = await pool.query(query, values);

    return NextResponse.json({
      matches: result.rows,
    });
  } catch (err) {
    console.error('CHECK ADMISSION ERROR:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
