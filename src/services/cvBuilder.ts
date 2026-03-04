import fs from "fs";
import path from "path";
import { rewriteBullets } from "./bulletRewrite";
import { MatchResult, ParsedJD } from "../types/types";

export async function buildCV(match: MatchResult, jd: ParsedJD) {
  const master = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/master.json"), "utf8"),
  );

  const experience = [];

  for (const role of match.relevantRoles) {
    const bullets = await rewriteBullets(
      role.achievements,
      jd.responsibilities,
      jd.keywords,
    );

    experience.push({
      company: role.company,
      title: role.title,
      years: role.years,
      bullets,
    });
  }

  return {
    name: master.name,
    title: master.base_title,
    skills: match.relevantSkills,
    experience,
  };
}
