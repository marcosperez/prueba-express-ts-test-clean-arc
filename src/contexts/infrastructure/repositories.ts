import { PrismaClient } from "@prisma/client";
import { UserRepository } from "./users/User.repository";

export class AppRepositories {
  usersRepository: UserRepository;

  constructor(primaClient: PrismaClient) {
    this.usersRepository = new UserRepository(primaClient);
  }
}
