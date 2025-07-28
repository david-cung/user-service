/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { CreateUserResDto } from './dto/response';
import { UpdateUserDto } from './dto/request/update-user.dto';

@Controller()
export class UserConsumer {
  constructor(private readonly userService: UserService) { }

  @MessagePattern('create_user')
  async handleUserCreated(message: CreateUserDto): Promise<CreateUserResDto> {
    return this.userService.createUser(message);
  }

  @MessagePattern('update_user')
  async handleUserUpdated(message: UpdateUserDto): Promise<CreateUserResDto> {
    return this.userService.updateUser(message);
  }
}
