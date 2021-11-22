import axios, { Axios } from "axios";
import { ApiError } from "../../../../shared/errors/ApiError";
import { OMDBData } from "../../entities/OMDbData";
import { IApiSearchParams } from "../../models/IApiSearchParams";
import { IOMDbDataApiRepository } from "../IOMDbDataApiRepository";

const apikey = "925eba28";

interface IApiResponse {
  Response: "True" | "False";
  Error: string;
}

interface ISearchResponse extends IApiResponse {
  Search: OMDBData[];
  totalResults: string;
}

interface ISearchByIdResponse extends IApiResponse, OMDBData {}

export class OMDbDataApiRepository implements IOMDbDataApiRepository {
  repository: Axios;

  constructor() {
    this.repository = axios.create({
      baseURL: "https://www.omdbapi.com/",
    });
  }

  async listAll({ s = "batman", y, type = "movie", page = "1" }: IApiSearchParams) {
    const { data: response } = await this.repository.get<ISearchResponse>("", {
      params: {
        s,
        y,
        type,
        page,
        apikey,
      },
    });

    const pageNumber = Number(page);

    if (response.Response === "False") throw new ApiError(response.Error, 413);

    const previousPage = pageNumber > 1 ? pageNumber - 1 : null;

    const totalPages = Math.ceil(Number(response.totalResults) / 10);

    const nextPage = pageNumber < totalPages ? pageNumber + 1 : null;

    const result = {
      results: response.Search,
      previousPage,
      totalPages,
      nextPage,
    };

    return result;
  }

  async findById(id: string): Promise<OMDBData> {
    const { data } = await this.repository.get<ISearchByIdResponse>("", {
      params: {
        i: id,
        apikey,
      },
    });

    if (data.Response === "False") throw new ApiError(data.Error, 400);

    return data;
  }
}
