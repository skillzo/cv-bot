import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";

export async function generatePDF(html: string, file: string) {
  const outPath = path.isAbsolute(file) ? file : path.join(process.cwd(), file);
  const dir = path.dirname(outPath);
  fs.mkdirSync(dir, { recursive: true });

  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: "networkidle0" });

  await page.pdf({
    path: outPath,
    format: "A4",
    printBackground: true,
  });

  await browser.close();
  return outPath;
}
