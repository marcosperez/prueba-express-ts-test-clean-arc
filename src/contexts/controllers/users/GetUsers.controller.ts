import axios from "axios";
import { Request, Response } from "express";
import GetUsers from "../../application/users/GetUsers";

import { Controller } from "../Controller";

export class GetUsersController implements Controller {
  async handler(req: Request, res: Response): Promise<void> {
    console.log("[GetUsersController] Buscando usuarios....");

    // const users = await axios.get("https://jsonplaceholder.typicode.com/users");
    const users = await GetUsers.execute();

    console.log("[GetUsersController] Usuarios encontrados..");
    console.log(users);

    res.json(users);
  }
}

export default new GetUsersController();
