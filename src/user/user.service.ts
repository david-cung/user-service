/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserResDto } from './dto/response';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import * as bcrypt from 'bcrypt';
import { AppLogger } from '@/logger.service';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly logger: AppLogger
  ) {}

  async createUser(data: CreateUserDto): Promise<CreateUserResDto> {
     this.logger.error(
        `❌ Failed login attempt`,
        `Invalid credentials: username=${data}`,
        'AuthService',
        401, // unauthorized
      );
    const id = uuidv4();
    const hashPassword = await bcrypt.hash(data.password, 10);
    await this.userRepository.insert({...data, password: hashPassword});
    return plainToInstance(CreateUserResDto, { id });
  }

  async updateUser(data: UpdateUserDto): Promise<CreateUserResDto> {
    await this.userRepository.update({ id: data.id }, data);
    return { id: data.id };
  }

  findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }
}
