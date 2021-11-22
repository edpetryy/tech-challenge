import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListDataUseCase } from "./listDataUseCase";

export class ListDataController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { search, page, type, year } = request.query;

    const listDataUseCase = container.resolve(ListDataUseCase);

    if (!!type && !["movie", "series", "episode"].includes(type as string)) {
      return response
        .status(400)
        .json({ error: `Invalid type ${type}, it must be one of "movie" ,"series" or "episode"` });
    }

    const paginatedResponse = await listDataUseCase.execute({
      s: search as string,
      page: page as string,
      type: type as "movie" | "series" | "episode",
      y: year as string,
    });

    return response.status(200).json(paginatedResponse);
  }
}
