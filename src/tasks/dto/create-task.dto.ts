import { IsString, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Comprar pão' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'Ir à padaria comprar pão francês' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ enum: ['pending', 'completed'], default: 'pending' })
  @IsOptional()
  @IsEnum(['pending', 'completed'])
  status?: 'pending' | 'completed';

  @ApiPropertyOptional({ example: '2024-06-10T23:59:59.000Z' })
  @IsOptional()
  @IsDateString()
  dueDate?: Date;
} 