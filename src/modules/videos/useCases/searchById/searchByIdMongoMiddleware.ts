import { NextFunction, Request, Response } from "express";
import { SearchByIdMongoUseCase } from "./searchByIdMongoUseCase";

export class SearchByIdMongoMiddleare {
  async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
    const { id } = request.params;

    const searchByIdMongoUseCase = await SearchByIdMongoUseCase.getInstance();

    try {
      const video = await searchByIdMongoUseCase.execute(id);
      return response.status(200).json(video);
    } catch (err) {
      next();
    }
  }
}
