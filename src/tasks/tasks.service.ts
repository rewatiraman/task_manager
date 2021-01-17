import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDTO } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  getAllTasks(): Task[] {
    return this.tasks;
  }
  getTaskWithFilter(filterDTO: GetTaskFilterDTO): Task[] {
    const { status, search } = filterDTO;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => {
        task.status === status;
      });
    }
    if (search) {
      tasks = tasks.filter((task) => {
        task.title.includes(search) || task.description.includes(search);
      });
    }
    return tasks;
  }
  createTask(createtaskdto: CreateTaskDTO): Task {
    const { title, description } = createtaskdto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.NEW,
    };
    this.tasks.push(task);
    return task;
  }
  getTaskByID(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }
  deleteTaskByID(id: string): void {
    this.tasks = this.tasks.filter((task) => {
      task.id !== id;
    });
  }
  updateTaskByID(id: string, status: TaskStatus): Task {
    const task = this.getTaskByID(id);
    task.status = status;
    return task;
  }
}
