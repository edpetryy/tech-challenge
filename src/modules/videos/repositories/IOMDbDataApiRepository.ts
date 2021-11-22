import { OMDBData } from "../entities/OMDbData";
import { IApiSearchParams } from "../models/IApiSearchParams";
import { Paginate } from "../models/Paginate";

export interface IOMDbDataApiRepository {
  listAll(params: IApiSearchParams): Promise<Paginate<OMDBData>>;
  findById(id: string): Promise<OMDBData>;
}
