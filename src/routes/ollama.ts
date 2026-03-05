import { Router } from "express";
import { askOllama } from "../clients/askOllama";
import { matchResume } from "../services/matcher";
import { askOllamaStream } from "../clients/streamOllama";
import { buildCV } from "../services/cvBuilder";
import { parseJD } from "../services/jobparser";
import { buildHTML } from "../services/htmlBuilder";
import { generatePDF } from "../services/pdf";

const r: Router = Router();

r.post("/stream", async (req, res) => {
  const prompt =
    (typeof req.body.prompt === "string" && req.body.prompt.trim()) ||
    "Say hello in one sentence.";
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.flushHeaders();

  try {
    for await (const chunk of askOllamaStream(prompt)) {
      // Preserve legacy shape: always send plain text for existing clients
      res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
      if (
        "flush" in res &&
        typeof (res as { flush?: () => void }).flush === "function"
      ) {
        (res as { flush: () => void }).flush();
      }
    }
    res.write("data: [DONE]\n\n");
  } catch (e) {
    res.write(`data: ${JSON.stringify({ error: String(e) })}\n\n`);
  }
  res.end();
});

r.get("/chat", async (req, res) => {
  const prompt = req.query.prompt as string;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  for await (const chunk of askOllamaStream(prompt)) {
    res.write(
      `data: ${JSON.stringify({
        type: chunk.type,
        text: chunk.text,
      })}\n\n`,
    );
  }

  res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
  res.end();
});

r.post("/prompt", async (req, res) => {
  const jd = `
  We are looking for a Senior Backend Engineer with Node.js,
  Postgres and distributed systems experience.
  `;

  const parsed = await parseJD(jd);

  const match = await matchResume(parsed);

  const cv = await buildCV(match, parsed);

  console.log(JSON.stringify(cv, null, 2));

  const html = buildHTML(cv);
  console.log("html", html);

  await generatePDF(html, "outputs/cv.pdf");

  return res.json({ cv });
});

export default r;
