import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import MorganConfig from "./configs/morgan.config";
import cors from "cors";
import { json } from "body-parser";
import { ConfigAppRouter } from "./configs/router.config";
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(MorganConfig.MorganLogConsole);
app.use(MorganConfig.MorganLogFile);

// parse application/json
app.use(json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

ConfigAppRouter(app);

app.listen(port, () => {
  console.log(
    `⚡️[server]: Server is running at https://localhost:${port} ....`
  );
});
