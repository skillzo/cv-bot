import { matchResume } from "./services/matcher";
import { askOllama } from "./clients/askOllama";

async function run() {
  const jd = `
We are looking for a Senior Backend Engineer with Node.js,
Postgres and distributed systems experience.
`;

  const parsed = await askOllama(jd);

  const match = await matchResume(parsed as any);

  console.log(parsed);
  console.log(match);
}

run();
