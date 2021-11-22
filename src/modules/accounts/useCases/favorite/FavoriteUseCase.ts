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

export class FavoriteUseCase {
  userMongoRepository: UserMongoRepository;
  private static INSTANCE: FavoriteUseCase;

  private constructor() {}

  public static async getInstance(): Promise<FavoriteUseCase> {
    if (!FavoriteUseCase.INSTANCE) {
      FavoriteUseCase.INSTANCE = new FavoriteUseCase();
      FavoriteUseCase.INSTANCE.userMongoRepository = await UserMongoRepository.getInstance();
    }

    return FavoriteUseCase.INSTANCE;
  }

  async execute(user_id: string, video_id: string): Promise<string[]> {
    const user = await this.userMongoRepository.findById(user_id);

    const favorites = user.favorites.includes(video_id)
      ? [...user.favorites.filter((id) => id !== video_id)]
      : [...user.favorites, video_id];

    await this.userMongoRepository.updateFavorites(user_id, favorites);

    return favorites;
  }
}
