import { ApiError } from "../../../../shared/errors/ApiError";
import { IUserDTO } from "../../models/IUserDTO";
import { UserMongoRepository } from "../../repositories/implementation/UserMongoRepository";

export class CreateUserUseCase {
  userMongoRepository: UserMongoRepository;
  private static INSTANCE: CreateUserUseCase;

  private constructor() {}

  public static async getInstance(): Promise<CreateUserUseCase> {
    if (!CreateUserUseCase.INSTANCE) {
      CreateUserUseCase.INSTANCE = new CreateUserUseCase();
      CreateUserUseCase.INSTANCE.userMongoRepository = await UserMongoRepository.getInstance();
    }

    return CreateUserUseCase.INSTANCE;
  }

  async execute({ name, login, password }: IUserDTO): Promise<void> {
    const user = await this.userMongoRepository.findByLogin(login);

    if (user) throw new ApiError("Login already in use", 400);

    await this.userMongoRepository.create({ name, login, password });
  }
}
