// src/lib/parser/dateRegex.ts
export function extractDatesRegex(text: string) {
  const regex = /(\d{4})\s*оны\s*(\d{1,2})\s*сарын\s*(\d{1,2}).*?(\d{1,2})\s*сарын\s*(\d{1,2})/;

  const m = text.match(regex);
  if (!m) return null;

  const start = `${m[1]}-${m[2].padStart(2, '0')}-${m[3].padStart(2, '0')}`;
  const end = `${m[1]}-${m[4].padStart(2, '0')}-${m[5].padStart(2, '0')}`;

  return { start_date: start, end_date: end };
}
