import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { title } from 'process';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDTO } from './dto/get-task-filter.dto';
import { Task, TaskStatus } from './tasks.model';
import { TasksService} from './tasks.service'
@Controller('tasks')
export class TasksController {
    constructor( private taskservice:TasksService ){}
    @Get()
    getTasks(@Query() filterTaskDTO:GetTaskFilterDTO):Task[]{
        if(Object.keys(filterTaskDTO).length){
            return this.taskservice.getTaskWithFilter(filterTaskDTO)
        }else{
            return this.taskservice.getAllTasks()
        }
        
    } 
    @Post()
    createTask( @Body() createTaskdto:CreateTaskDTO): Task  {
       return  this.taskservice.createTask(createTaskdto);
    }
    @Get('/:id')
    getTaskByID(@Param('id') id:string):Task{
           return this.taskservice.getTaskByID(id)
    }
    @Delete('/:id')
    deleteTaskByID(@Param('id') id:string):void{
        this.taskservice.deleteTaskByID(id)
    }
    @Patch('/:id/status')
    updateTaskbyId(@Param('id')  id:string , @Body('status') status:TaskStatus):Task{
        return this.taskservice.updateTaskByID(id,status)
    }
}
