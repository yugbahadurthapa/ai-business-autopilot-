import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { idea } = await req.json();

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are an AI business strategist. Convert ideas into clear business plans.",
      },
      {
        role: "user",
        content: idea,
      },
    ],
  });

  return NextResponse.json({
    result: completion.choices[0].message.content,
  });
}
