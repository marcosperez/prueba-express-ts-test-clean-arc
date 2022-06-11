import { GetUsersFilterCriteria } from "../../domain/users/GetUsersFilterCriteria.domain";
import { User } from "../../domain/users/User.domain";
import { PageData } from "../../infrastructure/Infrastructure.common";
import UserRepository from "../../infrastructure/users/User.repository";

export class GetUsers {
  async execute(query: GetUsersFilterCriteria): Promise<PageData<User>> {
    const usersDb = UserRepository.find(query);

    return usersDb;
  }
}

export default new GetUsers();
