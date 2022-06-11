import { ok } from "assert";
import { Request, Response } from "express";
import Joi from "joi";
import CreateUser from "../../application/users/CreateUser";
import { Controller } from "../Controller";

const PostUsersSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
});

export class PostUsersController implements Controller {
  async handler(req: Request, res: Response): Promise<void> {
    try {
      console.log("[PostUsersController] Creando usuario....");
      console.log(req.body);

      const { error } = PostUsersSchema.validate(req.body);
      console.log("[PostUsersController] Validation");
      console.log(error);
      if (error !== undefined) {
        res.status(400).json({
          status: false,
          message: error?.message,
        });

        return;
      }

      const user = await CreateUser.execute(req.body);

      console.log("[PostUsersController] Usuario creado..");
      console.log(user);

      res.status(200).json({
        status: ok,
        data: user,
      });
    } catch (err) {
      console.log("[PostUsersController][Error]");
      console.log(err);

      res.status(500).json({
        status: false,
        message: "Error en creacion de usuario",
      });
    }
  }
}

export default new PostUsersController();
