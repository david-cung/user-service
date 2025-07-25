import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserConsumer } from './user.controller';

@Module({
  controllers: [UserConsumer], // Di chuyển vào đây
  providers: [UserService],     // Bỏ UserConsumer khỏi providers
})
export class UserModule { }