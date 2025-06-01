import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('deve criar um usuário', async () => {
    const dto = { name: 'Teste', email: 't@t.com', password: '123456' };
    const user = { id: 1, ...dto, createdAt: new Date() } as User;
    jest.spyOn(repo, 'create').mockReturnValue(user);
    jest.spyOn(repo, 'save').mockResolvedValue(user);
    const result = await service.create(dto as any);
    expect(result).toEqual(user);
  });

  it('deve buscar usuário por email', async () => {
    const user = { id: 1, name: 'Teste', email: 't@t.com', password: '123456', createdAt: new Date() } as User;
    jest.spyOn(repo, 'findOne').mockResolvedValue(user);
    const result = await service.findByEmail('t@t.com');
    expect(result).toEqual(user);
  });

  it('deve buscar usuário por id', async () => {
    const user = { id: 1, name: 'Teste', email: 't@t.com', password: '123456', createdAt: new Date() } as User;
    jest.spyOn(repo, 'findOne').mockResolvedValue(user);
    const result = await service.findById(1);
    expect(result).toEqual(user);
  });
}); 