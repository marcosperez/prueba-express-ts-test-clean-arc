export interface DefaultRepository<T, U> {
  create(user: T): Promise<T>;
  findById(id: number): Promise<T>;
  find(where: U): Promise<Array<T>>;
  update(id: number, user: T): Promise<T>;
  delete(id: number): Promise<void>;
}
