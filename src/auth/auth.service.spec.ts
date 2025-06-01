import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: { sign: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('deve registrar um novo usuário', async () => {
    const dto: CreateUserDto = { name: 'Teste', email: 't@t.com', password: '123456' };
    (usersService.findByEmail as jest.Mock).mockResolvedValue(null);
    (usersService.create as jest.Mock).mockResolvedValue({ id: 1, ...dto, password: 'hash', createdAt: new Date() });
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hash');
    const result = await service.register(dto);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('email', dto.email);
  });

  it('deve lançar erro se email já cadastrado', async () => {
    const dto: CreateUserDto = { name: 'Teste', email: 't@t.com', password: '123456' };
    (usersService.findByEmail as jest.Mock).mockResolvedValue({ id: 1, ...dto });
    await expect(service.register(dto)).rejects.toThrow('Email já cadastrado');
  });

  it('deve fazer login com sucesso', async () => {
    const dto: LoginUserDto = { email: 't@t.com', password: '123456' };
    const user = { id: 1, name: 'Teste', email: dto.email, password: 'hash' };
    (usersService.findByEmail as jest.Mock).mockResolvedValue(user);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
    (jwtService.sign as jest.Mock).mockReturnValue('token');
    const result = await service.login(dto);
    expect(result).toHaveProperty('access_token', 'token');
    expect(result.user).toHaveProperty('email', dto.email);
  });

  it('deve lançar erro se email não existe', async () => {
    const dto: LoginUserDto = { email: 't@t.com', password: '123456' };
    (usersService.findByEmail as jest.Mock).mockResolvedValue(null);
    await expect(service.login(dto)).rejects.toThrow('Credenciais inválidas');
  });

  it('deve lançar erro se senha inválida', async () => {
    const dto: LoginUserDto = { email: 't@t.com', password: '123456' };
    const user = { id: 1, name: 'Teste', email: dto.email, password: 'hash' };
    (usersService.findByEmail as jest.Mock).mockResolvedValue(user);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);
    await expect(service.login(dto)).rejects.toThrow('Credenciais inválidas');
  });
}); 