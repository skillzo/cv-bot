export interface ParsedJD {
  required_skills: string[];
  nice_to_have: string[];
  seniority: string;
  domain: string;
  keywords: string[];
  responsibilities: string[];
}

export interface Role {
  company: string;
  title: string;
  years: string;
  domain: string;
  stack: string[];
  achievements: string[];
}

export interface MasterResume {
  name: string;
  base_title: string;
  skills: string[];
  roles: Role[];
}

export interface MatchResult {
  relevantSkills: string[];
  relevantRoles: Role[];
}
