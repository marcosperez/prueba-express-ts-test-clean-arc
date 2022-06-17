import { FunctionResult } from "../../context.common";
import { RegisterUser } from "../../domain/users/RegisterUser.domain";
import { User } from "../../domain/users/User.domain";
import userRepository from "../../infrastructure/users/User.repository";
import { Service } from "../Service";

class RegisterUserService implements Service<RegisterUser, User> {
  async execute(userRegisterData: RegisterUser): Promise<FunctionResult<User>> {
    const passwordHash = await User.hashPassword(userRegisterData.password);
    const newUser = new User({
      id: undefined,
      passwordHash,
      ...userRegisterData,
    });

    const dbUser = await userRepository.create(newUser);

    return [true, dbUser];
  }
}

export default new RegisterUserService();
