import { Request, Response } from "express";
import { container } from "tsyringe";
import { SearchByIdUseCase } from "./searchByIdUseCase";

export class SearchByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const searchByIdUseCase = container.resolve(SearchByIdUseCase);

    const video = await searchByIdUseCase.execute(id);

    return response.status(200).json(video);
  }
}
