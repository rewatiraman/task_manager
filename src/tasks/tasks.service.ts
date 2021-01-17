import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import {v4 as uuid}  from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  getAllTasks(): Task[] {
    return this.tasks;
  }
  createTask(createtaskdto:CreateTaskDTO): Task {
      const{title,description} = createtaskdto
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.NEW,
    };
    this.tasks.push(task);
    return task;
  }
  getTaskByID(id:string):Task{
     return this.tasks.find(task=>task.id===id )
  }
  deleteTaskByID(id:string):void{
       this.tasks = this.tasks.filter((task)=>{task.id !== id})
  }
  updateTaskByID(id:string , status:TaskStatus):Task{
      const task = this.getTaskByID(id)
      task.status = status;
      return task
  }
}
