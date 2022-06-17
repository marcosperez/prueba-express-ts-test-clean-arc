import express from "express";
import { ValidatorBody, ValidatorHeaders, ValidatorQuery } from "../Validation";
import GetUsersController, { QueryGetUsersSchema } from "./GetUsers.controller";
import LoginUserController, { BodyLoginSchema } from "./LoginUser.controller";
import RegisterUserController, {
  BodyRegisterSchema,
} from "./RegisterUser.controller";

var router = express.Router();

router.get(
  "/",
  ValidatorQuery(QueryGetUsersSchema),
  ValidatorHeaders(),
  ValidatorBody(),
  GetUsersController.handler
);
router.post(
  "/register",
  ValidatorQuery(),
  ValidatorHeaders(),
  ValidatorBody(BodyRegisterSchema),
  RegisterUserController.handler
);
router.post(
  "/Login",
  ValidatorQuery(),
  ValidatorHeaders(),
  ValidatorBody(BodyLoginSchema),
  LoginUserController.handler
);

export default router;
