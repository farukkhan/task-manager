import "reflect-metadata";
import express, { Request, Response } from "express";
import { TaskController } from "./controllers/TaskController";
import { container } from "./containers/container";
import { ErrorHandler } from "./middlewares/errorHandler";
import { TaskValidationMiddleware } from "./middlewares/TaskValidationMiddleware";

const app = express();
app.use(express.json());

const taskController = container.resolve(TaskController);
const errorHandler = container.resolve(ErrorHandler);
const taskValidationMiddleware = container.resolve(TaskValidationMiddleware);

app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.get("/api/tasks", async (req: Request, res: Response) => {
  await taskController.getTasks(req, res);
});

app.get(
  "/api/tasks/:id",
  taskValidationMiddleware.validateTaskId.bind(taskValidationMiddleware),
  async (req: Request, res: Response) => {
    await taskController.getTaskById(req, res);
  },
);

app.post(
  "/api/tasks",
  taskValidationMiddleware.validateCreateTask.bind(taskValidationMiddleware),
  async (req: Request, res: Response) => {
    await taskController.createTask(req, res);
  },
);

app.put(
  "/api/tasks/:id",
  taskValidationMiddleware.validateUpdateTask.bind(taskValidationMiddleware),
  async (req: Request, res: Response) => {
    await taskController.updateTask(req, res);
  },
);

app.delete(
  "/api/tasks/:id",
  taskValidationMiddleware.validateTaskId.bind(taskValidationMiddleware),
  async (req: Request, res: Response) => {
    await taskController.deleteTask(req, res);
  },
);

app.use(errorHandler.handler.bind(errorHandler));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
