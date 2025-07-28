/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async createUser(data: { name: string; email: string }) {
    console.log('Creating user:', data);
    // Thực tế bạn sẽ lưu vào DB ở đây
    return {message: 'created user'}
  }
}
