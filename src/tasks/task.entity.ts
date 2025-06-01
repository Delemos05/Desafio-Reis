import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: 'pending' })
  status: 'pending' | 'completed';

  @Column({ nullable: true, type: 'datetime' })
  dueDate?: Date;

  @Column()
  userId: number;

  @Column({ nullable: true, type: 'datetime' })
  deletedAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 