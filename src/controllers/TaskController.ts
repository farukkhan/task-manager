import { Request, Response } from "express";
import { TaskService } from "../services/TaskService";
import { inject, injectable } from "tsyringe";
import { IdParser } from "../validators/IdParser";
import { TaskValidator } from "../validators/TaskValidator";
import { ILogger } from "../logging/ILogger";

@injectable()
export class TaskController {
  constructor(
    @inject(TaskService) private taskService: TaskService,
    @inject("ILogger") private logger: ILogger,
  ) {}

  async getTasks(req: Request, res: Response) {
    const tasks = await this.taskService.getTasks();

    res.status(200).json(tasks);
  }

  async getTaskById(req: Request, res: Response) {
    const { isValid, id } = IdParser.parseId(req);

    if (!isValid) {
      res.status(400).json({ error: "Invalid task ID" });
      this.logger.warn(`Invalid task ID received: ${req.params.id}`);
      return;
    }

    const task = await this.taskService.getTaskById(id);

    if (task === null) {
      res.status(404).json({ error: "Task not found" });
      this.logger.warn(`Task not found with Id: ${req.params.id}`);
    } else {
      res.status(200).json(task);
    }
  }

  async createTask(req: Request, res: Response) {
    const { title } = req.body;

    const createdTask = await this.taskService.createTask(title);
    res.status(201).json(createdTask);
  }

  async updateTask(req: Request, res: Response) {
    const { isValid, id } = IdParser.parseId(req);

    if (!isValid) {
      res.status(400).json({ error: "Invalid task ID" });
      this.logger.warn(`Invalid task ID received: ${req.params.id}`);
      return;
    }

    const { title, completed } = req.body;

    const updateValidation = TaskValidator.validateUpdateData(title, completed);
    if (!updateValidation.isValid) {
      res.status(400).json({ error: updateValidation.error });
      this.logger.warn(
        `Invalid task update data received: ${JSON.stringify(req.body)}`,
      );
      return;
    }

    const updatedTask = await this.taskService.updateTask(
      id,
      updateValidation.value.title,
      updateValidation.value.completed,
    );

    if (!updatedTask) {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.status(200).json(updatedTask);
    }
  }

  async deleteTask(req: Request, res: Response) {
    const { isValid, id } = IdParser.parseId(req);

    if (!isValid) {
      res.status(400).json({ error: "Invalid task ID" });
      this.logger.warn(`Invalid task ID received: ${req.params.id}`);
      return;
    }

    const isDeleted = await this.taskService.deleteTask(id);
    if (!isDeleted) {
      res.status(404).json({ error: "Task not found" });
      this.logger.warn(`Task not found with Id: ${req.params.id}`);
    } else {
      res.status(204).send();
    }
  }
}
