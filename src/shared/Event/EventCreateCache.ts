import { EventEmitter } from "events";
import { OMDBData } from "../../modules/videos/entities/OMDbData";
import { OMDbDataCacheRepository } from "../../modules/videos/repositories/implementation/OMDbDataCacheRepository";
import { OMDbDataMongoRepository } from "../../modules/videos/repositories/implementation/OMDbDataMongoRepository";

const newCacheAll = Symbol("newCacheAll");
const newCache = Symbol("newCache");

export class EventCreateCache {
  emitter: EventEmitter;
  oMDbDataCacheRepository: OMDbDataCacheRepository;
  oMDbDataMongoRepository: OMDbDataMongoRepository;
  private static INSTANCE: EventCreateCache;

  private constructor() {
    this.emitter = new EventEmitter();
    this.oMDbDataCacheRepository = OMDbDataCacheRepository.getInstance();
    OMDbDataMongoRepository.getInstance().then(
      (oMDbDataMongoRepository) => (this.oMDbDataMongoRepository = oMDbDataMongoRepository)
    );
  }

  public static getInstance(): EventCreateCache {
    if (!EventCreateCache.INSTANCE) {
      EventCreateCache.INSTANCE = new EventCreateCache();
    }

    return EventCreateCache.INSTANCE;
  }

  emmitAll(payload: OMDBData) {
    this.emitter.emit(newCacheAll, payload);
  }

  emmitMongodb(payload: OMDBData) {
    this.emitter.emit(newCache, payload);
  }

  watchAll() {
    this.emitter.on(newCacheAll, async (data: OMDBData) => {
      await Promise.all([
        this.oMDbDataCacheRepository.create(data),
        this.oMDbDataMongoRepository.create(data),
      ]);
    });

    this.emitter.on(newCache, async (data: OMDBData) => {
      await this.oMDbDataCacheRepository.create(data);
    });
  }
}
