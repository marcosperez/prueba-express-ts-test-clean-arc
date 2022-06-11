import { User } from "../../domain/users/User.domain";
import { PrismaClient } from "@prisma/client";
import { GetUsersFilterCriteria } from "../../domain/users/GetUsersFilterCriteria.domain";
import { UserRepositoryInterface } from "./User.repository.interface";
import { PageData } from "../Infrastructure.common";

class UserRepository implements UserRepositoryInterface {
  prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  findById(id: number): Promise<User> {
    throw new Error("Method not implemented.");
  }

  async find(where: GetUsersFilterCriteria): Promise<PageData<User>> {
    const skip = (where.page - 1) * where.pageSize;
    let whereQuery = {};
    if (where.filter) {
      whereQuery = {
        OR: {
          username: { contains: where.filter },
          name: { contains: where.filter },
          email: { contains: where.filter },
        },
      };
    }

    const allUsers = await this.prisma.users.findMany({
      where: whereQuery,
      take: where.pageSize,
      skip: skip,
    });
    const totalUsers = await this.prisma.users.count({ where: whereQuery });

    console.log(allUsers);
    const pageData: PageData<User> = {
      list: allUsers.map((u) => new User(u)),
      totalRegistries: totalUsers,
    };

    return pageData;
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
