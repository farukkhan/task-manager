import { inject, injectable } from "tsyringe";
import { Request, Response, NextFunction } from "express";
import { Logger } from "../logging/Logger";

@injectable()
export class ErrorHandler {
  constructor(@inject("ILogger") private logger: Logger) {}

  handler(error: unknown, req: Request, res: Response, next: NextFunction) {
    console.error(error);

    if (error instanceof Error) {
      this.logger.error("An error occurred", error);
      res.status(500).json({ error: error.message });
    }
  }
}
