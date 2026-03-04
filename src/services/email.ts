import nodemailer from "nodemailer";

const t = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL, pass: process.env.PASS },
});

export async function sendEmail(to: string, subject: string, file: string) {
  await t.sendMail({
    from: process.env.EMAIL,
    to,
    subject,
    text: "Application attached",
    attachments: [{ path: file }],
  });
}
