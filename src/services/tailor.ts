import { ask } from "./openai";
import fs from "fs";

export async function tailorResume(parsed: any) {
  const master = fs.readFileSync("src/data/master.json", "utf8");

  return JSON.parse(
    await ask(`
                You are a CV optimizer.

                INPUT PROFILE:
                ${master}

                JOB:
                ${JSON.stringify(parsed)}

                Return a READY CV JSON:
                    {
                        name:"",
                        title:"",
                        summary:"",
                        skills:[],
                        experience:[
                        {company:"", role:"", bullets:[]}
                        ]
                    }
`),
  );
}
