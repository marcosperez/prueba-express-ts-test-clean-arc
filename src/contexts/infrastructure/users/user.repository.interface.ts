import { GetUsersFilterCriteria } from "../../domain/users/GetUsersFilterCriteria.domain";
import { User } from "../../domain/users/User.domain";
import { DefaultRepository } from "../infrastructure.common";

export interface UserRepositoryInterface
  extends DefaultRepository<User, GetUsersFilterCriteria> {}
