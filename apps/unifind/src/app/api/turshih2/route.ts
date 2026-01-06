import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { university } = await req.json();
    console.log({ university });

    if (!university) {
      return NextResponse.json(
        { error: "universityName шаардлагатай" },
        { status: 400 }
      );
    }

    const prompt = `
Өгөгдсөн их сургуулийн нэрийг ашиглан тухайн сургуулийн элсэлтийн бүртгэл эхлэх болон дуусах сар, өдрийг ол.

Сургуулийн нэр: "${university}"

Зөвхөн JSON буцаа форматтай:
{
  "start_date": "MM-DD",
  "end_date": "MM-DD"
}
`;

    const aiResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    // Gemini-s irsen text-г олж авна
    const rawText = (aiResponse as any).text ?? aiResponse;

    // ⚡ ```json``` болон ``` тэмдэгтийг устгана
    const cleaned = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // JSON parse
    const parsed = JSON.parse(cleaned);

    return NextResponse.json(parsed);
  } catch (err: any) {
    console.error("Gemini fetch error:", err);
    return NextResponse.json({ error: "Gemini fetch failed" }, { status: 500 });
  }
}
