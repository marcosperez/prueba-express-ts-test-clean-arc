import { ServiceResult } from "../../context.common";
import { RegisterUser } from "../../domain/users/RegisterUser.domain";
import { User } from "../../domain/users/User.domain";
import { UserRepositoryInterface } from "../../infrastructure/users/User.repository.interface";
import { Service } from "../Service";

export class RegisterUserService implements Service<RegisterUser, User> {
  userRepository: UserRepositoryInterface;
  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  async execute(userRegisterData: RegisterUser): Promise<ServiceResult<User>> {
    const passwordHash = await User.hashPassword(userRegisterData.password);
    const newUser = new User({
      id: undefined,
      passwordHash,
      ...userRegisterData,
    });

    const dbUser = await this.userRepository.create(newUser);

    return [true, dbUser];
  }
}
