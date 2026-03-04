import fs from "fs";
import path from "path";
import { MatchResult, ParsedJD } from "../types/types";
import { askOllama } from "../clients/askOllama";

export async function matchResume(jd: ParsedJD): Promise<MatchResult> {
  const master = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/master.json"), "utf8"),
  );

  const response = await askOllama(`
    Given this resume profile:
    ${JSON.stringify(master)}
    And this job:
    ${JSON.stringify(jd)}
    Return JSON:
    {
    "relevantSkills": [],
    "relevantRoles": []
    }
`);

  const raw = response as unknown as Partial<MatchResult>;
  const result: MatchResult = {
    relevantSkills: Array.isArray(raw?.relevantSkills)
      ? raw.relevantSkills
      : [],
    relevantRoles: Array.isArray(raw?.relevantRoles) ? raw.relevantRoles : [],
  };

  console.log("response in matchResume", response);

  return result as unknown as MatchResult;
}
