import { Request, Response } from "express";
import Joi from "joi";
import { Controller } from "../Controller";
import { GetUsersFilterCriteria } from "../../domain/users/GetUsersFilterCriteria.domain";
import { GetUsersService } from "../../application/users/GetUsers.application";

export const QueryGetUsersSchema = Joi.object({
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
  getUsersService: GetUsersService;
  constructor(getUsersService: GetUsersService) {
    this.getUsersService = getUsersService;
  }

  async handler(req: Request, res: Response): Promise<void> {
    console.log("[GetUsersController] Buscando usuarios....");
    const query = { ...defaultPagination, ...req.query };
    const [ok, users] = await this.getUsersService.execute(query);
    if (!ok) {
      res.status(404).json({
        status: false,
        message: "Error en get de usuarios",
      });
      return;
    }

    console.log("[GetUsersController] Usuarios encontrados..");
    console.log(users);

    res.json(users);
  }
}
