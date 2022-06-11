import { User, UserParams } from "../../domain/users/User.domain";
import userRepository from "../../infrastructure/users/user.repository";

export class GetUsers {
  async execute(): Promise<Array<User>> {
    const usersDb = userRepository.find({});

    return usersDb;
  }
}

export default new GetUsers();
