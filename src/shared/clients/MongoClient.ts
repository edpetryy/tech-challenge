import { MongoClient as Mongo, Db } from "mongodb";

export class MongoClient {
  client: Mongo;
  movie_db: string = process.env.MONGODB_DATABASE;
  private static INSTANCE: MongoClient;

  private constructor() {
    this.client = new Mongo(
      `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`
    );
  }

  public static getInstance(): MongoClient {
    if (!MongoClient.INSTANCE) {
      MongoClient.INSTANCE = new MongoClient();
    }

    return MongoClient.INSTANCE;
  }

  async connect(): Promise<Db> {
    await this.client.connect();
    const db = this.client.db(this.movie_db);
    return db;
  }
}
