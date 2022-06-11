import { GetUsersFilterCriteria } from "../../domain/users/GetUsersFilterCriteria.domain";
import { User, UserParams } from "../../domain/users/User.domain";
import userRepository from "../../infrastructure/users/user.repository";

export class GetUsers {
  async execute(query: GetUsersFilterCriteria): Promise<Array<User>> {
    const usersDb = userRepository.find(query);

    return usersDb;
  }
}

export default new GetUsers();
