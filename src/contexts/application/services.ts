import { PrismaClient } from "@prisma/client";
import { AppRepositories } from "../infrastructure/repositories";
import { GetUsersService } from "./users/GetUsers.application";
import { LoginUserService } from "./users/LoginUser.application";
import { RegisterUserService } from "./users/RegisterUser.application";

export class AppServices {
  getUsersService: GetUsersService;
  loginUserService: LoginUserService;
  registerUserService: RegisterUserService;

  constructor(respositories: AppRepositories) {
    this.getUsersService = new GetUsersService(respositories.usersRepository);
    this.loginUserService = new LoginUserService(respositories.usersRepository);
    this.registerUserService = new RegisterUserService(
      respositories.usersRepository
    );
  }
}
