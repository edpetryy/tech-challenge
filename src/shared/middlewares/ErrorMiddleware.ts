import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors/ApiError";

export const errorHandler = (
  err: Error | ApiError,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if ("code" in err) {
    return response.status(err.code).json({ error: err.message });
  }
  return response.status(500).json({ error: err.message });
};
