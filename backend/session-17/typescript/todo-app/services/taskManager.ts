
import { Task } from "../models/task";
import { User } from "../models/user";

export class TaskManager<T extends Task> {
  private tasks: T[] = [];
  private users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
  }

  addTask(task: T): void {
    this.tasks.push(task);
  }

  getUserTasks(userId: number): T[] {
    return this.tasks.filter(task => task.id === userId);
  }

  toggleTaskStatus(taskId: number): void {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
    }
  }

  printTasks(): void {
    this.tasks.forEach(t =>
      console.log(`(${t.id}) ${t.title} - ${t.completed ? "✅" : "❌"}`)
    );
  }
}
