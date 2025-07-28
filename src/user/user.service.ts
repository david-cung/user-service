/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserResDto } from './dto/response';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { LoginDto } from './dto/request/login.dto';
import { LoginResDto } from './dto/response/login-res.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(data: CreateUserDto): Promise<CreateUserResDto> {
    const id = uuidv4();
    await this.userRepository.insert(data);
    return plainToInstance(CreateUserResDto, { id });
  }

  async updateUser(data: UpdateUserDto): Promise<CreateUserResDto> {
    await this.userRepository.update({ id: data.id }, data);
    return { id: data.id };
  }

  async login(data: LoginDto): Promise<LoginResDto> {
    const checkUserExist = await this.userRepository.findOne({
      where: {
        email: data.email,
        password: data.password,
      },
    });
    if (checkUserExist) {
      return { message: 'Login success' }; 
    }
    return { message: 'Login failed.' };
  }
}
