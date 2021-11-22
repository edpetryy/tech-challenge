import { inject, injectable } from "tsyringe";
import { OMDBData } from "../../entities/OMDbData";
import { OMDbDataCacheRepository } from "../../repositories/implementation/OMDbDataCacheRepository";

@injectable()
export class SearchByIdCacheUseCase {
  oMDbDataCacheRepository: OMDbDataCacheRepository;

  constructor() {
    this.oMDbDataCacheRepository = OMDbDataCacheRepository.getInstance();
  }

  async execute(id: string): Promise<OMDBData> {
    const data = await this.oMDbDataCacheRepository.findById(id);

    return data;
  }
}
