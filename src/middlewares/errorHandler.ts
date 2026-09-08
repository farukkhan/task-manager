import { inject, injectable } from "tsyringe";
import { Request, Response, NextFunction } from "express";
import { ILogger } from "../logging/ILogger";

@injectable()
export class ErrorHandler {
  constructor(@inject("ILogger") private logger: ILogger) {}

  handler(error: unknown, req: Request, res: Response, next: NextFunction) {
    if (error instanceof Error) {
      this.logger.error("An error occurred", error);
      res.status(500).json({ error: error.message });
    }
  }
}
