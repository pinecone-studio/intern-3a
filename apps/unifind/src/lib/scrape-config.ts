export type ScrapeConfig = {
  url: string;
  selector: string;
  match: (text: string) => boolean;
  prompt: (text: string) => string;
};

export const SCRAPE_CONFIG: Record<number, ScrapeConfig> = {
  1: {
    // МУИС
    url: 'https://elselt.num.edu.mn/?page_id=12',
    selector: 'p',
    match: (text) => text.includes('Элсэлтийн бүртгэл') && text.includes('явагдана'),
    prompt: (text) => `
Дараах текстээс элсэлтийн бүртгэл эхлэх болон дуусах огноог ол.

TEXT:
"${text}"

Зөвхөн JSON буцаа.

{
  "start_date": "YYYY-MM-DD",
  "end_date": "YYYY-MM-DD"
}
`,
  },

  2: {
    // жишээ: ШУТИС
    url: 'https://elselt.edu.mn/page/14',
    selector: 'div',
    match: (text) => text.includes('бүртгэл эхэлнэ'),
    prompt: (text) => `
Extract admission start/end dates.

TEXT:
"${text}"

Return JSON only.
`,
  },
};
