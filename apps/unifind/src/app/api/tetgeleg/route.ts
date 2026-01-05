import axios from "axios";
import * as cheerio from "cheerio";

type Item = {
  title: string;
  link: string;
  image?: string;
};

export async function GET() {
  const url =
    "https://news.num.edu.mn/?tag=%D1%82%D1%8D%D1%82%D0%B3%D1%8D%D0%BB%D1%8D%D0%B3";

  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const items: Item[] = [];

  // JSON-LD → постуудын линк
  const jsonText = $('script[type="application/ld+json"]').first().html();
  if (!jsonText) return Response.json([]);

  const json = JSON.parse(jsonText);
  const list = json["@graph"][0].itemListElement;

  // ⚠️ олон request тул demo-д 5-аар хязгаарлая
  for (const post of list.slice(0, 5)) {
    const link = post.url;

    const postRes = await axios.get(link);
    const $$ = cheerio.load(postRes.data);

    const title = $$("h1").first().text().trim();
    const image = $$('meta[property="og:image"]').attr("content") || undefined;

    items.push({ title, link, image });
  }

  return Response.json(items);
}
