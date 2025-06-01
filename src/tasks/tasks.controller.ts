import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseGuards, Logger } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  private readonly logger = new Logger(TasksController.name);

  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @GetUser() user: any) {
    this.logger.log(`POST /tasks - User ${user.userId} creating task: ${createTaskDto.title}`);
    return this.tasksService.create(createTaskDto, user.userId);
  }

  @Get()
  findAll(@GetUser() user: any, @Query('status') status?: 'pending' | 'completed') {
    this.logger.log(`GET /tasks - User ${user.userId} listing tasks with status: ${status || 'all'}`);
    return this.tasksService.findAll(user.userId, status);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: any) {
    this.logger.log(`GET /tasks/${id} - User ${user.userId} fetching task.`);
    return this.tasksService.findOne(Number(id), user.userId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @GetUser() user: any) {
    this.logger.log(`PUT /tasks/${id} - User ${user.userId} updating task.`);
    return this.tasksService.update(Number(id), updateTaskDto, user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: any) {
    this.logger.log(`DELETE /tasks/${id} - User ${user.userId} deleting task.`);
    return this.tasksService.remove(Number(id), user.userId);
  }
} 