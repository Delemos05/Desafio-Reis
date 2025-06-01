import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

describe('TasksService', () => {
  let service: TasksService;
  let repo: Repository<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repo = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  it('deve criar uma tarefa', async () => {
    const createTaskDto = { title: 'Teste', description: 'Desc', status: 'pending' };
    const userId = 1;
    const task = { ...createTaskDto, id: 1, userId, createdAt: new Date(), updatedAt: new Date() } as Task;

    jest.spyOn(repo, 'create').mockReturnValue(task);
    jest.spyOn(repo, 'save').mockResolvedValue(task);

    const result = await service.create(createTaskDto as any, userId);
    expect(result).toEqual(task);
  });

  it('deve listar tarefas do usuário', async () => {
    const userId = 1;
    const tasks = [
      { id: 1, title: 'Tarefa 1', userId, status: 'pending', createdAt: new Date(), updatedAt: new Date() } as Task,
      { id: 2, title: 'Tarefa 2', userId, status: 'completed', createdAt: new Date(), updatedAt: new Date() } as Task,
    ];
    jest.spyOn(repo, 'find').mockResolvedValue(tasks);
    const result = await service.findAll(userId);
    expect(result).toEqual(tasks);
  });

  it('deve buscar uma tarefa por id', async () => {
    const userId = 1;
    const task = { id: 1, title: 'Tarefa', userId, status: 'pending', createdAt: new Date(), updatedAt: new Date() } as Task;
    jest.spyOn(repo, 'findOne').mockResolvedValue(task);
    const result = await service.findOne(1, userId);
    expect(result).toEqual(task);
  });

  it('deve lançar erro se tarefa não encontrada', async () => {
    jest.spyOn(repo, 'findOne').mockResolvedValue(null);
    await expect(service.findOne(999, 1)).rejects.toThrow('Tarefa não encontrada');
  });

  it('deve atualizar uma tarefa', async () => {
    const userId = 1;
    const task = { id: 1, title: 'Tarefa', userId, status: 'pending', createdAt: new Date(), updatedAt: new Date() } as Task;
    const updateDto = { title: 'Atualizada' };
    jest.spyOn(service, 'findOne').mockResolvedValue(task);
    jest.spyOn(repo, 'save').mockResolvedValue({ ...task, ...updateDto });
    const result = await service.update(1, updateDto as any, userId);
    expect(result).toEqual({ ...task, ...updateDto });
  });

  it('deve fazer soft delete de uma tarefa', async () => {
    const userId = 1;
    const task = { id: 1, title: 'Tarefa', userId, status: 'pending', createdAt: new Date(), updatedAt: new Date() } as Task;
    jest.spyOn(service, 'findOne').mockResolvedValue(task);
    jest.spyOn(repo, 'save').mockResolvedValue({ ...task, deletedAt: new Date() });
    const result = await service.remove(1, userId);
    expect(result).toBe(true);
  });
}); 