import { Router } from "express";
import { tailorResume } from "../services/tailor";
import { makePDF } from "../services/pdf";
import { sendEmail } from "../services/email";
import { parseJD } from "../services/jobparser";

const r: Router = Router();

r.post("/", async (req, res) => {
  const { jd, email } = req.body;

  const parsed = await parseJD(jd);
  console.log("parsed required skills", parsed);
  const cv = await tailorResume(parsed);
  console.log("tailored cv", cv);
  const file = await makePDF(cv);
  console.log("pdf file", file);
  if (email) await sendEmail(email, "Application", file);

  res.json({ file, parsed });
});

export default r;
