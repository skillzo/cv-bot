import axios from "axios";

export async function askOllama(prompt: string): Promise<string> {
  const res = await axios.post("http://localhost:11434/api/generate", {
    model: "phi3:mini",
    stream: false,
    format: "json",
    options: {
      temperature: 0,
      top_p: 0.9,
      num_ctx: 2048,
      num_predict: 512,
      repeat_penalty: 1.1,
      seed: 42,
    },
    prompt: `
            You are a JSON API. You MUST return ONLY valid JSON.
            No explanation.
            No markdown.
            No reasoning.
            Return JSON only.
    
            ${prompt}
            `,
  });
  return JSON.parse(res.data.response);
}
