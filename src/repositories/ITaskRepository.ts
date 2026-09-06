import { Task } from "../models/Task";

export interface ITaskRepository{

 getTasks(): Promise<Task[]>;

 getTaskById(id:number): Promise<Task | null>;

 createTask(title: string): Promise<Task>;

}