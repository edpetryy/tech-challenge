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

export class AuthenticateUserUseCase {
  userMongoRepository: UserMongoRepository;
  private static INSTANCE: AuthenticateUserUseCase;

  private constructor() {}

  public static async getInstance(): Promise<AuthenticateUserUseCase> {
    if (!AuthenticateUserUseCase.INSTANCE) {
      AuthenticateUserUseCase.INSTANCE = new AuthenticateUserUseCase();
      AuthenticateUserUseCase.INSTANCE.userMongoRepository =
        await UserMongoRepository.getInstance();
    }

    return AuthenticateUserUseCase.INSTANCE;
  }

  async execute({ login, password }: IRequest): Promise<IResponse> {
    const user = await this.userMongoRepository.findByLogin(login);

    if (!user) throw new ApiError("Login or password incorrect", 400);

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) throw new ApiError("Login or password incorrect", 400);

    const userDTO = Object.keys(user)
      .filter((key) => key !== "password")
      .reduce((acc, key) => ({ ...acc, [key]: user[key] }), {}) as User;

    const token = sign(userDTO, process.env.JWT_KEY, {
      subject: user._id.toString(),
    });

    const tokenReturn = { user: { ...userDTO, _id: user._id.toString() }, token };

    return tokenReturn;
  }
}
