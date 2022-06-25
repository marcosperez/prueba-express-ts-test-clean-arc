import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import MorganConfig from "./morgan.config";
import cors from "cors";
import { json } from "body-parser";
import { ConfigAppRouter } from "./router.config";
import { AppRepositories } from "./contexts/infrastructure/repositories";
import { AppServices } from "./contexts/application/services";
import prisma from "./contexts/infrastructure/client";
import path from "path";
dotenv.config();

export function createApp(client = prisma) {
  const app: Express = express();

  app.use(cors());
  app.use(MorganConfig.MorganLogConsole);
  app.use(MorganConfig.MorganLogFile);

  app.use(json());

  app.get("/ping", (req: Request, res: Response) => {
    res.json({ status: "ok", message: "pong" });
  });
  const repositories = new AppRepositories(client);
  const services = new AppServices(repositories);
  ConfigAppRouter(app, services, repositories);

  console.log("RAILWAY_STATIC_URL: ", process.env.RAILWAY_STATIC_URL);
  console.log("RAILWAY_GIT_COMMIT_SHA: ", process.env.RAILWAY_GIT_COMMIT_SHA);
  console.log("RAILWAY_GIT_AUTHOR: ", process.env.RAILWAY_GIT_AUTHOR);
  console.log("RAILWAY_GIT_BRANCH: ", process.env.RAILWAY_GIT_BRANCH);
  console.log("RAILWAY_GIT_REPO_NAME: ", process.env.RAILWAY_GIT_REPO_NAME);
  console.log("RAILWAY_GIT_REPO_OWNER: ", process.env.RAILWAY_GIT_REPO_OWNER);
  console.log(
    "RAILWAY_GIT_COMMIT_MESSAGE: ",
    process.env.RAILWAY_GIT_COMMIT_MESSAGE
  );
  console.log(
    "RAILWAY_HEALTHCHECK_TIMEOUT_SEC: ",
    process.env.RAILWAY_HEALTHCHECK_TIMEOUT_SEC
  );
  console.log("RAILWAY_ENVIRONMENT: ", process.env.RAILWAY_ENVIRONMENT);

  console.log("Dir web: ", path.join(__dirname, "/web"));
  app.use("/", express.static(path.join(__dirname, "/web")));
  return app;
}
