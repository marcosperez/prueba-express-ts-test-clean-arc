import { FunctionResult } from "../context.common";

export interface Service<T, R> {
  execute(params: T): Promise<FunctionResult<R | undefined>>;
}
