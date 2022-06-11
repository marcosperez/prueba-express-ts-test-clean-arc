import { User } from "../../domain/users/User.domain";
import { UserRepositoryInterface } from "./user.repository.interface";
import { PrismaClient } from "@prisma/client";
import { GetUsersFilterCriteria } from "../../domain/users/GetUsersFilterCriteria.domain";

class UserRepository implements UserRepositoryInterface {
  prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  findById(id: number): Promise<User> {
    throw new Error("Method not implemented.");
  }
  async find(where: GetUsersFilterCriteria): Promise<User[]> {
    const skip = (where.page - 1) * where.pageSize;
    const allUsers = await this.prisma.users.findMany({
      where: { username: { contains: where.filter } },
      take: where.pageSize,
      skip: skip,
    });
    console.log(allUsers);

    return allUsers.map((u) => new User(u));
  }
  update(id: number, user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async create(user: User): Promise<User> {
    const dbUser = await this.prisma.users.create({ data: user.persistData() });

    return new User(dbUser);
  }
}

export default new UserRepository();
