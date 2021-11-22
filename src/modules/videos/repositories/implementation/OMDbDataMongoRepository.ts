import { OMDBData } from "../../entities/OMDbData";
import { IOMDbDataDBRepository } from "../IOMDbDataDBRepository";
import { Db } from "mongodb";
import { MongoClient } from "../../../../shared/clients/MongoClient";
import { ApiError } from "../../../../shared/errors/ApiError";

export class OMDbDataMongoRepository implements IOMDbDataDBRepository {
  db: Db;
  private static INSTANCE: OMDbDataMongoRepository;

  private constructor() {}

  public static async getInstance(): Promise<OMDbDataMongoRepository> {
    if (!OMDbDataMongoRepository.INSTANCE) {
      OMDbDataMongoRepository.INSTANCE = new OMDbDataMongoRepository();
      OMDbDataMongoRepository.INSTANCE.db = await MongoClient.getInstance().connect();
    }

    return OMDbDataMongoRepository.INSTANCE;
  }

  async create(data: OMDBData): Promise<void> {
    await this.db.collection<OMDBData>("movie").insertOne(data);
  }

  async findById(id: string): Promise<OMDBData> {
    const result = await this.db.collection<OMDBData>("movie").findOne<OMDBData>({
      imdbID: id,
    });
    if (!result) throw new ApiError("Movie not found", 404);

    const filtered = Object.keys(result)
      .filter((key) => key !== "_id")
      .reduce((acc, key) => ({ ...acc, [key]: result[key] }), {});

    return filtered as OMDBData;
  }
}
