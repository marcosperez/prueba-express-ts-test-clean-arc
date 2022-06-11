import { User, UserParams } from "../../domain/users/User.domain";
import { usersDB } from "./mock.users";
import { UserRepositoryInterface } from "./user.repository.interface";
import { PrismaClient } from "@prisma/client";

class UserRepository implements UserRepositoryInterface {
  users: Array<User>;
  prisma: PrismaClient;
  constructor() {
    // this.users = new Array<User>();
    this.users = usersDB as any;
    this.prisma = new PrismaClient();
  }

  findById(id: number): Promise<User> {
    throw new Error("Method not implemented.");
  }
  async find(where: Partial<User>): Promise<User[]> {
    const allUsers = await this.prisma.users.findMany();
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
