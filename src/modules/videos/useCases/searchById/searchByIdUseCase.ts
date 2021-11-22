import { inject, injectable } from "tsyringe";
import { EventCreateCache } from "../../../../shared/Event/EventCreateCache";
import { OMDBData } from "../../entities/OMDbData";
import { IOMDbDataApiRepository } from "../../repositories/IOMDbDataApiRepository";

@injectable()
export class SearchByIdUseCase {
  constructor(
    @inject("OMDbDataApiRepository")
    private oMDbDataApiRepository: IOMDbDataApiRepository
  ) {}

  async execute(id: string): Promise<OMDBData> {
    const data = await this.oMDbDataApiRepository.findById(id);

    const eventCreateCache = EventCreateCache.getInstance();

    eventCreateCache.emmitAll(data);

    return data;
  }
}
