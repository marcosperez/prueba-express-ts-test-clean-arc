import { GetUsersFilterCriteria } from "../../domain/users/GetUsersFilterCriteria.domain";
import { User } from "../../domain/users/User.domain";
import { PageData } from "../../infrastructure/Infrastructure.common";
import { UserDTO } from "../../domain/users/UserDTO.domain";
import { ServiceResult } from "../../context.common";
import { Service } from "../Service";
import { UserRepositoryInterface } from "../../infrastructure/users/User.repository.interface";

export class GetUsersService
  implements Service<GetUsersFilterCriteria, PageData<UserDTO>>
{
  userRepository: UserRepositoryInterface;
  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  async execute(
    query: GetUsersFilterCriteria
  ): Promise<ServiceResult<PageData<UserDTO>>> {
    const users = await this.userRepository.find(query);
    const countUsers = await this.userRepository.count(query);

    const page = {
      list: users.map((u) => User.toUserDTO(u)),
      count: countUsers,
    };

    return [true, page];
  }
}
