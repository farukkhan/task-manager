import "reflect-metadata";
import express, { Request, Response } from "express";
import { TaskController } from "./controllers/TaskController";
import { container } from "./containers/container";
import { TaskValidationMiddleware } from "./middlewares/TaskValidationMiddleware";
import { ErrorHandlerMiddleware } from "./middlewares/ErrorHandlerMiddleware";
import { TaskIdParamDto } from "./dtos/TaskIdParamDto";
import { CreateTaskDto } from "./dtos/CreateTaskDto";
import { UpdateTaskDto } from "./dtos/UpdateTaskDto";

const app = express();
app.use(express.json());

const taskController = container.resolve(TaskController);
const errorHandler = container.resolve(ErrorHandlerMiddleware);
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
    const taskIdParam = res.locals.params as TaskIdParamDto;
    await taskController.getTaskById(req, res, taskIdParam);
  },
);

app.post(
  "/api/tasks",
  taskValidationMiddleware.validateCreateTask.bind(taskValidationMiddleware),
  async (req: Request, res: Response) => {
    const createTaskDto = res.locals.params as CreateTaskDto;
    await taskController.createTask(req, res, createTaskDto);
  },
);

app.put(
  "/api/tasks/:id",
  taskValidationMiddleware.validateUpdateTask.bind(taskValidationMiddleware),
  async (req: Request, res: Response) => {
    const updateTaskDto = res.locals.params as UpdateTaskDto;
    await taskController.updateTask(req, res, updateTaskDto);
  },
);

app.delete(
  "/api/tasks/:id",
  taskValidationMiddleware.validateTaskId.bind(taskValidationMiddleware),
  async (req: Request, res: Response) => {
    const taskIdParam = res.locals.params as TaskIdParamDto;
    await taskController.deleteTask(req, res, taskIdParam);
  },
);

app.use(errorHandler.handler.bind(errorHandler));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
