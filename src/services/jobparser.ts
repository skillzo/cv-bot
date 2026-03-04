import { ParsedJD } from "../types/types";
import { askOllama } from "../clients/askOllama";

export async function parseJD(jd: string): Promise<ParsedJD> {
  const response = await askOllama(`
                Extract structured JSON:
                {
                  "required_skills":[],
                  "nice_to_have":[],
                  "seniority":"",
                  "domain":"",
                  "responsibilities":[],
                  "keywords":[]
                }

                JOB DESCRIPTION:
                ${jd},
  `);

  return response as unknown as ParsedJD;
}
