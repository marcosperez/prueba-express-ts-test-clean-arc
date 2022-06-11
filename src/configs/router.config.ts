import { Express } from "express";
import usersRouter from "../contexts/controllers/users/Users.router";

export function ConfigAppRouter(app: Express) {
  app.use("/users", usersRouter);
}
