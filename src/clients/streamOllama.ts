import axios from "axios";
import { createInterface } from "readline";

const OLLAMA_URL = "http://localhost:11434/api/generate";
const MODEL = "qwen3:14b";

/** Yields each text chunk from Ollama (includes "thinking" then the answer). */
export async function* askOllamaStream(prompt: string): AsyncGenerator<string> {
  const res = await axios.post(
    OLLAMA_URL,
    {
      model: MODEL,
      stream: true,
      prompt,
    },
    { responseType: "stream" },
  );

  const rl = createInterface({ input: res.data, crlfDelay: Infinity });
  console.log("rl", rl);
  for await (const line of rl) {
    if (!line.trim()) continue;
    const obj = JSON.parse(line) as { response?: string; done?: boolean };
    console.log("obj", obj);
    if (obj.response) yield obj.response;
    if (obj.done) break;
  }
}
