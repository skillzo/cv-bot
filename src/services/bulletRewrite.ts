import { askOllama } from "../clients/askOllama";

export async function rewriteBullets(
  achievements: string[],
  responsibilities: string[],
  keywords: string[],
) {
  const res = await askOllama(`
            Rewrite the achievements to align with the job.

            RULES
            - Do NOT invent experience
            - Keep original meaning
            - Inject relevant keywords naturally
            - Keep bullet style
            - Return JSON

            INPUT ACHIEVEMENTS:
            ${JSON.stringify(achievements)}

            JOB RESPONSIBILITIES:
            ${JSON.stringify(responsibilities)}

            KEYWORDS:
            ${JSON.stringify(keywords)}

            Return:

            {
             "bullets":[]
            }
`);

  console.log("res in rewriteBullets", res);
  return res;
}
