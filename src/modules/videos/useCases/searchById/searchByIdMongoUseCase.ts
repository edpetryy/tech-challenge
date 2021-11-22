import { EventCreateCache } from "../../../../shared/Event/EventCreateCache";
import { OMDBData } from "../../entities/OMDbData";
import { OMDbDataMongoRepository } from "../../repositories/implementation/OMDbDataMongoRepository";

export class SearchByIdMongoUseCase {
  oMDbDataMongoRepository: OMDbDataMongoRepository;
  private static INSTANCE: SearchByIdMongoUseCase;

  private constructor() {}

  public static async getInstance(): Promise<SearchByIdMongoUseCase> {
    if (!SearchByIdMongoUseCase.INSTANCE) {
      SearchByIdMongoUseCase.INSTANCE = new SearchByIdMongoUseCase();
      SearchByIdMongoUseCase.INSTANCE.oMDbDataMongoRepository =
        await OMDbDataMongoRepository.getInstance();
    }

    return SearchByIdMongoUseCase.INSTANCE;
  }

  async execute(id: string): Promise<OMDBData> {
    const data = await this.oMDbDataMongoRepository.findById(id);

    const eventCreateCache = EventCreateCache.getInstance();

    eventCreateCache.emmitMongodb(data);

    return data;
  }
}
