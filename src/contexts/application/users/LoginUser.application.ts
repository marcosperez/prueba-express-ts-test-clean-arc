import { FunctionResult } from "../../context.common";
import { LoginUser } from "../../domain/users/LoginUser.domain";
import { LoginUserToken } from "../../domain/users/LoginUserToken.domain";
import { User } from "../../domain/users/User.domain";
import userRepository from "../../infrastructure/users/User.repository";
import { Service } from "../Service";

class LoginUserService implements Service<LoginUser, LoginUserToken> {
  async execute(
    userLoginData: LoginUser
  ): Promise<FunctionResult<LoginUserToken>> {
    const user = await userRepository.findByUsername(userLoginData.login);
    if (!user) {
      return [false, undefined];
    }

    const hash = await User.hashPassword(userLoginData.password);
    if (hash !== user.passwordHash) {
      return [false, undefined];
    }
    const tokenJWT = User.generateJWT({ username: userLoginData.login });

    return [true, { token: tokenJWT }];
  }
}

export default new LoginUserService();
