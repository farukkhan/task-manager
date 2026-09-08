import { injectable } from "tsyringe";
import { ILogger } from "./ILogger";

@injectable()
export class Logger implements ILogger {
  info(message: string) {
    console.log(`[INFO] ${new Date().toISOString()}: ${message}`);
  }

  warn(message: string) {
    console.warn(`[WARN] ${new Date().toISOString()}: ${message}`);
  }

  error(message: string, error?: unknown) {
    if (error) {
      console.error(`[ERROR] ${new Date().toISOString()}: ${message}`, error);
    } else {
      console.error(`[ERROR] ${new Date().toISOString()}: ${message}`);
    }
  }
}
