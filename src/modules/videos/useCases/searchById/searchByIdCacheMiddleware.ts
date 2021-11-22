import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { SearchByIdCacheUseCase } from "./searchByIdCacheUseCase";

export class SearchByIdCacheMiddleare {
  async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
    const { id } = request.params;

    const searchByIdCacheUseCase = container.resolve(SearchByIdCacheUseCase);

    try {
      const video = await searchByIdCacheUseCase.execute(id);
      return response.status(200).json(video);
    } catch (err) {
      next();
    }
  }
}
