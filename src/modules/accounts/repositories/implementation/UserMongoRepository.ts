import { IUserDTO } from "../../models/IUserDTO";
import { IUserRepository } from "../IUserRepository";
import { Db, WithId } from "mongodb";
import { MongoClient } from "../../../../shared/clients/MongoClient";
import { User } from "../../entities/User";
import { ObjectID } from "bson";

export class UserMongoRepository implements IUserRepository {
  db: Db;
  private static INSTANCE: UserMongoRepository;
  private constructor() {}

  public static async getInstance(): Promise<UserMongoRepository> {
    if (!UserMongoRepository.INSTANCE) {
      UserMongoRepository.INSTANCE = new UserMongoRepository();
      UserMongoRepository.INSTANCE.db = await MongoClient.getInstance().connect();
    }
    return UserMongoRepository.INSTANCE;
  }

  async updateFavorites(id: string, favorites: string[]): Promise<void> {
    await this.db.collection<User>("user").updateOne(
      {
        _id: new ObjectID(id),
      },
      {
        $set: { favorites },
      }
    );
  }

  async findById(id: string): Promise<User> {
    const user = await this.db.collection<User>("user").findOne({
      _id: new ObjectID(id),
    });

    return user;
  }

  async findByLogin(login: string): Promise<WithId<User>> {
    const user = await this.db.collection<User>("user").findOne({
      login,
    });

    return user;
  }

  async create({ password, login, name }: IUserDTO): Promise<void> {
    await this.db.collection<User>("user").insertOne({
      password,
      login,
      name,
      favorites: [],
    });
  }
}
