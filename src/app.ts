import express, { Request, Response } from "express";
import {TaskController} from "./controllers/TaskController";
import {TaskService} from "./services/TaskService";
import { TaskRepository } from "./repositories/TaskRepository";
import { ITaskRepository } from "./repositories/ITaskRepository";


const app = express();

const taskRepository: ITaskRepository = new TaskRepository();
const taskService =new TaskService(taskRepository);
const taskController = new TaskController(taskService);


app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "ok" });
});


app.get("/api/tasks", async (req: Request, res: Response) => {

 await taskController.GetTasks(req, res);
 
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});