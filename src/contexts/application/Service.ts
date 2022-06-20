import { ServiceResult } from "../context.common";

export interface Service<T, R> {
  execute(params: T): Promise<ServiceResult<R | undefined>>;
}
