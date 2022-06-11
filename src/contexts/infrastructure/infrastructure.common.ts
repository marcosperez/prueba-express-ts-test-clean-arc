export interface DefaultRepository<T> {
  create(user: T): Promise<T>;
  findById(id: number): Promise<T>;
  find(where: Partial<T>): Promise<Array<T>>;
  update(id: number, user: T): Promise<T>;
  delete(id: number): Promise<void>;
}
