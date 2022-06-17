import { GetUsersFilterCriteria } from "../../domain/users/GetUsersFilterCriteria.domain";
import { User } from "../../domain/users/User.domain";
import { PageData } from "../../infrastructure/Infrastructure.common";
import UserRepository from "../../infrastructure/users/User.repository";
import { UserDTO } from "../../domain/users/UserDTO.domain";
import { FunctionResult } from "../../context.common";
import { Service } from "../Service";

export class GetUsersService
  implements Service<GetUsersFilterCriteria, PageData<UserDTO>>
{
  async execute(
    query: GetUsersFilterCriteria
  ): Promise<FunctionResult<PageData<UserDTO>>> {
    const users = await UserRepository.find(query);
    const countUsers = await UserRepository.count(query);

    const page = {
      list: users.map((u) => User.toUserDTO(u)),
      count: countUsers,
    };

    return [true, page];
  }
}

export default new GetUsersService();
