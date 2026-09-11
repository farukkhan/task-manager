import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "tsyringe";
import { ILogger } from "@task-manager/application";
import { IdParser } from "../validators/IdParser";
import { TaskValidator } from "../validators/TaskValidator";
import { TaskIdParamDto } from "../dtos/TaskIdParamDto";
import { CreateTaskDto } from "../dtos/CreateTaskDto";
import { UpdateTaskDto } from "../dtos/UpdateTaskDto";

@injectable()
export class TaskValidationMiddleware {
  constructor(@inject("ILogger") private logger: ILogger) {}

  validateTaskId(req: Request, res: Response, next: NextFunction) {
    const parsedId = IdParser.parseId(req);

    if (!parsedId.isValid) {
      res.status(400).json({ error: "Invalid task ID" });
      this.logger.warn(`Invalid task ID received: ${req.params.id}`);
      return;
    }

    const taskIdParam: TaskIdParamDto = { id: parsedId.id };
    res.locals.params = taskIdParam;

    next();
  }

  validateCreateTask(req: Request, res: Response, next: NextFunction) {
    const { title } = req.body;

    const titleValidation = TaskValidator.validateTitle(title);

    if (!titleValidation.isValid) {
      res.status(400).json({ error: titleValidation.error });
      this.logger.warn(`Invalid task title received: ${title}`);
      return;
    }

    const createTaskDto: CreateTaskDto = {
      title: titleValidation.value,
    };
    res.locals.params = createTaskDto;

    next();
  }

  validateUpdateTask(req: Request, res: Response, next: NextFunction) {
    const { isValid, id } = IdParser.parseId(req);

    if (!isValid) {
      res.status(400).json({ error: "Invalid task ID" });
      this.logger.warn(`Invalid task ID received: ${req.params.id}`);
      return;
    }

    const updateValidation = TaskValidator.validateUpdateData(
      req.body.title,
      req.body.completed,
    );

    if (!updateValidation.isValid) {
      res.status(400).json({ error: updateValidation.error });
      this.logger.warn(
        `Invalid task update data received: ${JSON.stringify(req.body)}`,
      );
      return;
    }

    const updateTaskDto: UpdateTaskDto = {
      id,
      title: updateValidation.value.title,
      completed: updateValidation.value.completed,
    };

    res.locals.params = updateTaskDto;

    next();
  }
}
