import { inject, injectable } from "tsyringe";
import { OMDBData } from "../../entities/OMDbData";
import { IApiSearchParams } from "../../models/IApiSearchParams";
import { Paginate } from "../../models/Paginate";
import { IOMDbDataApiRepository } from "../../repositories/IOMDbDataApiRepository";

@injectable()
export class ListDataUseCase {
  constructor(
    @inject("OMDbDataApiRepository")
    private oMDbDataApiRepository: IOMDbDataApiRepository
  ) {}

  async execute(data: IApiSearchParams): Promise<Paginate<OMDBData>> {
    const paginatedResult = await this.oMDbDataApiRepository.listAll(data);

    return paginatedResult;
  }
}
