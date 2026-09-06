import "reflect-metadata";
import express, { Request, Response } from "express";
import {TaskController} from "./controllers/TaskController";
import { container } from "./containers/container";


const app = express();
app.use(express.json());

const taskController = container.resolve(TaskController);


app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "ok" });
});


app.get("/api/tasks", async (req: Request, res: Response) => {
 await taskController.GetTasks(req, res); 
});

app.get("/api/tasks/:id", async (req: Request, res: Response) => {
  await taskController.GetTaskById(req, res);
});

app.post("/api/tasks", async (req: Request, res: Response) => {
  await taskController.CreateTask(req, res);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});