/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserConsumer } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserConsumer], // Di chuyển vào đây
  providers: [UserService],
})
export class UserModule {}
