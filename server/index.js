import express from "express";
import indexRouter from "./routes/index.js";
import volleyball from "volleyball";
import chalk from "chalk";
import cors from "cors";

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(volleyball);
app.use(cors());
app.use(express.static(new URL("../public/", import.meta.url).pathname));

app.get("/", (req, res, next) => {
  res.sendFile(new URL("../public/index.html", import.meta.url).pathname);
});

app.use("/api", indexRouter);

app.use((error, _req, res, _next) => {
  console.error(chalk.red(error));
  res.status(500).json({
    message:
      "An error has occured in the system, check logs for more information",
  });
});

app.listen(PORT, () => {
  console.log(chalk.yellow(`Listening on http://localhost:${PORT}`));
});
