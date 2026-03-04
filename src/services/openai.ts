import OpenAI from "openai";

export const ai = new OpenAI({ apiKey: process.env.OPENAI_KEY! });

export async function ask(prompt: string): Promise<string> {
  const res = await ai.chat.completions.create({
    model: "gpt-4.1-mini",
    temperature: 0,
    messages: [{ role: "user", content: prompt }],
  });
  return res.choices[0].message.content!;
}
