import { User } from "../entities/User";
import { IUserDTO } from "../models/IUserDTO";

export interface IUserRepository {
  create(data: IUserDTO): Promise<void>;
  findByLogin(login: string): Promise<User>;
  findById(id: string): Promise<User>;
  updateFavorites(id: string, favorites: string[]): Promise<void>;
}
