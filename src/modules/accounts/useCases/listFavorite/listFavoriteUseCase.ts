import { ApiError } from "../../../../shared/errors/ApiError";
import { UserMongoRepository } from "../../repositories/implementation/UserMongoRepository";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { User } from "../../entities/User";

interface IRequest {
  login: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    login: string;
    _id: string;
  };
  token: string;
}

export class ListFavoriteUseCase {
  userMongoRepository: UserMongoRepository;
  private static INSTANCE: ListFavoriteUseCase;

  private constructor() {}

  public static async getInstance(): Promise<ListFavoriteUseCase> {
    if (!ListFavoriteUseCase.INSTANCE) {
      ListFavoriteUseCase.INSTANCE = new ListFavoriteUseCase();
      ListFavoriteUseCase.INSTANCE.userMongoRepository = await UserMongoRepository.getInstance();
    }

    return ListFavoriteUseCase.INSTANCE;
  }

  async execute(user_id: string): Promise<string[]> {
    const user = await this.userMongoRepository.findById(user_id);

    return user.favorites;
  }
}
