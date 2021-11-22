import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UserMongoRepository } from "../../modules/accounts/repositories/implementation/UserMongoRepository";
import { ApiError } from "../errors/ApiError";

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new ApiError("Authentication needed", 401);

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer") throw new ApiError("Invalid token type", 401);

  try {
    const { sub: user_id } = verify(token, process.env.JWT_KEY);

    const userMongoRepository = await UserMongoRepository.getInstance();

    const user = await userMongoRepository.findById(user_id as string);

    if (!user) throw new ApiError("User does not exists", 404);

    request.user_id = user_id as string;

    next();
  } catch (err) {
    throw new ApiError("Invalid token", 401);
  }
}
