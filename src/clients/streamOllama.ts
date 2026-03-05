import axios from "axios";
import { createInterface } from "readline";

const OLLAMA_URL = "http://localhost:11434/api/generate";
const MODEL = "qwen3:14b";

export type StreamChunk = {
  type: "thinking" | "response";
  text: string;
};

/** Yields each text chunk from Ollama, tagged as thinking/response. */
export async function* askOllamaStream(
  prompt: string,
): AsyncGenerator<StreamChunk> {
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
  for await (const line of rl) {
    if (!line.trim()) continue;
    const obj = JSON.parse(line) as {
      response?: string;
      thinking?: string;
      done?: boolean;
    };

    if (obj.thinking) {
      yield { type: "thinking", text: obj.thinking };
    }
    if (obj.response) {
      yield { type: "response", text: obj.response };
    }
    if (obj.done) break;
  }
}
