import { Request, Response } from "express";
import Joi from "joi";
import LoginUserService from "../../application/users/LoginUser.application";
import { Controller } from "../Controller";

class LoginUserController implements Controller {
  async handler(req: Request, res: Response): Promise<void> {
    try {
      const [ok, token] = await LoginUserService.execute(req.body);
      if (!ok) {
        res.status(404).json({
          status: false,
          message: "Error en login",
        });
        return;
      }

      res.status(200).json({
        status: ok,
        data: { token },
      });
    } catch (err) {
      console.log("[LoginUsersController][Error]");
      console.log(err);

      res.status(500).json({
        status: false,
        message: "Error en creacion de usuario",
      });
    }
  }
}

export const BodyLoginSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
});

export default new LoginUserController();
