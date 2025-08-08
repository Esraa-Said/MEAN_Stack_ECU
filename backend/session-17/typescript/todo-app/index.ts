
import { TaskManager } from "./services/taskManager";
import { Task } from "./models/task";
import { User } from "./models/user";

const manager = new TaskManager<Task>();

const user: User = {
  id: 1,
  name: "Esraa",
  location: [30.05, 31.23]
};

manager.addUser(user);

manager.addTask({ id: 1, title: "Learn TypeScript", completed: false });
manager.addTask({ id: 2, title: "Build a project", completed: false });

manager.toggleTaskStatus(1);
manager.printTasks();
