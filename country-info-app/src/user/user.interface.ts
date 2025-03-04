import { User } from "src/public/schema/user.schema";

export interface IUserService {
  create(username: string): Promise<User>;
  findAll(): Promise<User[]>;
}
