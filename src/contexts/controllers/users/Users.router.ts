import { Router, Request, Response } from "express";
import { AppServices } from "../../application/services";
import { AppRepositories } from "../../infrastructure/repositories";
import { ValidatorBody, ValidatorHeaders, ValidatorQuery } from "../Validation";
import { GetUsersController, QueryGetUsersSchema } from "./GetUsers.controller";
import { BodyLoginSchema, LoginUserController } from "./LoginUser.controller";
import {
  BodyRegisterSchema,
  RegisterUserController,
} from "./RegisterUser.controller";

export default function createUserRoutes(
  services: AppServices,
  repositories: AppRepositories
): Router {
  var router = Router();

  const getUsersController = new GetUsersController(services.getUsersService);
  const registerUserController = new RegisterUserController(
    services.registerUserService
  );
  const loginUserController = new LoginUserController(
    services.loginUserService
  );

  router.get(
    "/",
    ValidatorQuery(QueryGetUsersSchema),
    ValidatorHeaders(),
    ValidatorBody(),
    (req: Request, res: Response) => getUsersController.handler(req, res)
  );
  router.post(
    "/register",
    ValidatorQuery(),
    ValidatorHeaders(),
    ValidatorBody(BodyRegisterSchema),
    (req: Request, res: Response) => registerUserController.handler(req, res)
  );
  router.post(
    "/Login",
    ValidatorQuery(),
    ValidatorHeaders(),
    ValidatorBody(BodyLoginSchema),
    (req: Request, res: Response) => loginUserController.handler(req, res)
  );

  return router;
}
