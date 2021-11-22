import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { login, password } = request.body;

    const authenticateUserUseCase = await AuthenticateUserUseCase.getInstance();

    const userResponse = await authenticateUserUseCase.execute({ login, password });

    return response.status(200).json(userResponse);
  }
}
