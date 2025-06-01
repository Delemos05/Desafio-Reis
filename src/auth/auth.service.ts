import { Injectable, UnauthorizedException, ConflictException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    this.logger.log(`Attempting to register user with email: ${createUserDto.email}`);
    const existing = await this.usersService.findByEmail(createUserDto.email);
    if (existing) {
      this.logger.warn(`Registration failed: Email already exists - ${createUserDto.email}`);
      throw new ConflictException('Email já cadastrado');
    }
    const hash = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.usersService.create({ ...createUserDto, password: hash });
    this.logger.log(`User registered successfully with email: ${user.email}`);
    return { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt };
  }

  async login(loginUserDto: LoginUserDto) {
    this.logger.log(`Attempting to log in user with email: ${loginUserDto.email}`);
    const user = await this.usersService.findByEmail(loginUserDto.email);
    if (!user) {
      this.logger.warn(`Login failed: User not found - ${loginUserDto.email}`);
      throw new UnauthorizedException('Credenciais inválidas');
    }
    const valid = await bcrypt.compare(loginUserDto.password, user.password);
    if (!valid) {
      this.logger.warn(`Login failed: Invalid password for email - ${loginUserDto.email}`);
      throw new UnauthorizedException('Credenciais inválidas');
    }
    const payload = { sub: user.id, email: user.email };
    this.logger.log(`User logged in successfully with email: ${user.email}`);
    return {
      access_token: this.jwtService.sign(payload),
      user: { id: user.id, name: user.name, email: user.email },
    };
  }
} 