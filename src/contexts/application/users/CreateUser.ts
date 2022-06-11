import { User, UserParams } from "../../domain/users/User.domain";
import userRepository from "../../infrastructure/users/user.repository";

class CreateUser {
  async execute(userData: UserParams): Promise<User> {
    const newUser = User.create(userData);
    const dbUser = userRepository.create(newUser);

    return dbUser;
  }
}

export default new CreateUser();
