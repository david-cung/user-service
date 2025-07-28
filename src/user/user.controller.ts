/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserConsumer {
  constructor(private readonly userService: UserService) { }

  @MessagePattern('create_user')
  async handleUserCreated(@Payload() message: any) {
    // const rawValue = message?.value?.toString(); // Buffer → string
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    // const data = JSON.parse(rawValue);
    console.log('Received user.created:', message);
    return this.userService.createUser(message.period);
  }
}
