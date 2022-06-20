import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import MorganConfig from "./configs/morgan.config";
import cors from "cors";
import { json } from "body-parser";
import { ConfigAppRouter } from "./configs/router.config";
import { AppRepositories } from "./contexts/infrastructure/repositories";
import { PrismaClient } from "@prisma/client";
import { AppServices } from "./contexts/application/services";
import prisma from "./helpers/client";
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

  return app;
}
