import { container } from "tsyringe";
import { TaskRepository } from "../repositories/TaskRepository";

container.register("ITaskRepository", { useClass: TaskRepository });

export { container };
