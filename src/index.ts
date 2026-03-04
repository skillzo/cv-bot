import "dotenv/config";
import express from "express";
import generateRoutes from "./routes/generate";
import ollamaRoutes from "./routes/ollama";

const app = express();
app.use((req, _res, next) => {
  console.log(req.method, req.originalUrl);
  next();
});
app.use(express.json({ limit: "5mb" }));
app.use("/generate", generateRoutes);
app.use("/ollama", ollamaRoutes);

app.listen(8000, () => console.log("running on port 8000"));
