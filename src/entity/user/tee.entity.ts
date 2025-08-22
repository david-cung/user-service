import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Unique(['email'])
  @Column()
  email: string;

  @Column({ type: 'varchar', nullable: false, length: 10000 })
  userName: string;

  @Column({ type: 'varchar', nullable: false, length: 10000 })
  password: string;

  @Column({ type: 'varchar', nullable: false, length: 100 })
  phone: string;

  @Column({ type: 'varchar', nullable: true })
  photoURL: string;

  @Column({ type: 'varchar', nullable: true })
  role: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({
    nullable: true,
  })
  createdAt: string;

  @UpdateDateColumn({
    nullable: true,
  })
  updatedAt: string;

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
