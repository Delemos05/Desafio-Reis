import { IsString, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiPropertyOptional({ example: 'Comprar pão' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'Ir à padaria comprar pão francês' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ enum: ['pending', 'completed'] })
  @IsOptional()
  @IsEnum(['pending', 'completed'])
  status?: 'pending' | 'completed';

  @ApiPropertyOptional({ example: '2024-06-10T23:59:59.000Z' })
  @IsOptional()
  @IsDateString()
  dueDate?: Date;
} 