import { Pagination } from "../common/Pagination";

export interface GetUsersFilterCriteria extends Pagination {
  filter?: string;
}
