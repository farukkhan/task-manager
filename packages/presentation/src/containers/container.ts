import { container } from "tsyringe";
import { TaskRepository } from "@task-manager/infrastructure";
import { Logger } from "@task-manager/infrastructure";

container.register("ITaskRepository", { useClass: TaskRepository });
container.register("ILogger", { useClass: Logger });

export { container };
