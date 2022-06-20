import { Express } from "express";
import { AppServices } from "../contexts/application/services";
import createUserRoutes from "../contexts/controllers/users/Users.router";
import { AppRepositories } from "../contexts/infrastructure/repositories";

export function ConfigAppRouter(
  app: Express,
  services: AppServices,
  repositories: AppRepositories
) {
  const usersRouter = createUserRoutes(services, repositories);
  app.use("/users", usersRouter);
}
