import { OMDBData } from "../entities/OMDbData";

export interface IOMDbDataDBRepository {
  create(data: OMDBData): Promise<void>;
  findById(id: string): Promise<OMDBData>;
}
