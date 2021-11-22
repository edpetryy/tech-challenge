import { Request, Response } from "express";
import { ListFavoriteUseCase } from "./listFavoriteUseCase";

export class ListFavoriteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request;

    const favoriteUseCase = await ListFavoriteUseCase.getInstance();

    const favorites = await favoriteUseCase.execute(user_id);

    return response.status(200).json({ favorites });
  }
}
