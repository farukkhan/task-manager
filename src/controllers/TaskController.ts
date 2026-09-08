import { Request, Response } from "express";
import { TaskService } from "../services/TaskService";
import { inject, injectable } from "tsyringe";
import { IdParser } from "../validators/IdParser";
import { TaskValidator } from "../validators/TaskValidator";

@injectable()
export class TaskController {
  constructor(@inject(TaskService) private taskService: TaskService) {}

  async GetTasks(req: Request, res: Response) {
    const tasks = await this.taskService.getTasks();

    res.status(200).json(tasks);
  }

  async GetTaskById(req: Request, res: Response) {
    const { isValid, id } = IdParser.ParseId(req);

    if (!isValid) {
      res.status(400).json({ error: "Invalid task ID" });
      return;
    }

    const task = await this.taskService.getTaskById(id);

    if (task === null) {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.status(200).json(task);
    }
  }

  async CreateTask(req: Request, res: Response) {
    const { title } = req.body;

    const titleValidation = TaskValidator.ValidateTitle(title);
    if (!titleValidation.isValid) {
      res.status(400).json({ error: titleValidation.error });
      return;
    }

    const createdTask = await this.taskService.createTask(title);
    res.status(201).json(createdTask);
  }

  async UpdateTask(req: Request, res: Response) {
    const { isValid, id } = IdParser.ParseId(req);

    if (!isValid) {
      res.status(400).json({ error: "Invalid task ID" });
      return;
    }

    const { title, completed } = req.body;

    const updateValidation = TaskValidator.ValidateUpdateData(title, completed);
    if (!updateValidation.isValid) {
      res.status(400).json({ error: updateValidation.error });
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

  async DeleteTask(req: Request, res: Response) {
    const { isValid, id } = IdParser.ParseId(req);

    if (!isValid) {
      res.status(400).json({ error: "Invalid task ID" });
      return;
    }

    const isDeleted = await this.taskService.deleteTask(id);
    if (!isDeleted) {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.status(204).send();
    }
  }
}
