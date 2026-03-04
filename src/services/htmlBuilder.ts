import fs from "fs";
import path from "path";
import Handlebars from "handlebars";

export function buildHTML(cv: any) {
  const template = fs.readFileSync(
    path.join(__dirname, "../templates/cv.hbs"),
    "utf8",
  );

  const compile = Handlebars.compile(template);

  return compile(cv);
}
