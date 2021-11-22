import { Request, Response } from "express";
import { FavoriteUseCase } from "./FavoriteUseCase";

export class FavoriteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request;
    const { video_id } = request.body;

    const favoriteUseCase = await FavoriteUseCase.getInstance();

    const favorites = await favoriteUseCase.execute(user_id, video_id);

    return response.status(200).json({ favorites });
  }
}
