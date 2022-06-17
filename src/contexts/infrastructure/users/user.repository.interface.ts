import { GetUsersFilterCriteria } from "../../domain/users/GetUsersFilterCriteria.domain";
import { User } from "../../domain/users/User.domain";
import { DefaultRepository } from "../Infrastructure.common";

export interface UserRepositoryInterface
  extends DefaultRepository<User, GetUsersFilterCriteria> {
  findByUsername(login: string): Promise<User | null>;
}
