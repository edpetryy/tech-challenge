import { OMDBData } from "../../entities/OMDbData";
import { IOMDbDataDBRepository } from "../IOMDbDataDBRepository";
import { Cache, CacheClass } from "memory-cache";

export class OMDbDataCacheRepository implements IOMDbDataDBRepository {
  cache: CacheClass<string, OMDBData>;
  private static INSTANCE: OMDbDataCacheRepository;

  private constructor() {
    this.cache = new Cache<string, OMDBData>();
  }

  public static getInstance(): OMDbDataCacheRepository {
    if (!OMDbDataCacheRepository.INSTANCE) {
      OMDbDataCacheRepository.INSTANCE = new OMDbDataCacheRepository();
    }

    return OMDbDataCacheRepository.INSTANCE;
  }

  create(data: OMDBData): Promise<void> {
    return new Promise((resolve, reject) => {
      this.cache.put(data.imdbID, data);

      resolve();
    });
  }

  findById(id: string): Promise<OMDBData> {
    return new Promise((resolve, reject) => {
      const data = this.cache.get(id);

      if (!data) reject();

      resolve(data);
    });
  }
}
