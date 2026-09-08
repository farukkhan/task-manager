import { Request } from "express";

type ParseIdResult =
  | {
      isValid: true;
      id: number;
    }
  | {
      isValid: false;
      id?: undefined;
    };

export class IdParser {
  static parseId(req: Request): ParseIdResult {
    const paramId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;
    const id = Number(paramId);

    if (Number.isInteger(id) && id > 0) return { isValid: true, id };
    else return { isValid: false };
  }
}
