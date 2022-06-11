import axios from "axios";
import { Request, Response } from "express";
import Joi from "joi";
import GetUsers from "../../application/users/GetUsers";
import { Controller } from "../Controller";
import { GetUsersFilterCriteria } from "../../domain/users/GetUsersFilterCriteria.domain";

const GetUsersSchema = Joi.object({
  filter: Joi.string().min(1).max(30),
  page: Joi.number().min(1).max(99999),
  pageSize: Joi.number().max(100).min(1),
  sortField: Joi.string().valid("id", "username", "name", "email"),
  sortDirection: Joi.number().valid("asc", "desc"),
});

const defaultPagination: GetUsersFilterCriteria = {
  page: 1,
  pageSize: 10,
  sortField: "id",
  sortDirection: "desc",
};

export class GetUsersController implements Controller {
  async handler(req: Request, res: Response): Promise<void> {
    console.log("[GetUsersController] Buscando usuarios....");
    const query = { ...defaultPagination, ...req.query };

    const { error, value } = GetUsersSchema.validate(query);
    console.log("[GetUsersController] Validation");
    console.log(error);
    if (error !== undefined) {
      res.status(400).json({
        status: false,
        message: error?.message,
      });

      return;
    }

    const users = await GetUsers.execute(value);

    console.log("[GetUsersController] Usuarios encontrados..");
    console.log(users);

    res.json(users);
  }
}

export default new GetUsersController();
