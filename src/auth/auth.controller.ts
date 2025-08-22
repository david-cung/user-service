import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { LoginDto } from '@/user/dto/request/login.dto';
import { LoginResDto } from '@/user/dto/response/login-res.dto';
import { AppLogger } from '@/logger.service';

@Controller('')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: AppLogger,
  ) {}

  @MessagePattern('login_user')
  async login(message: LoginDto): Promise<LoginResDto> {
    this.logger.error(
        `user111111111111111111`,
        `Invalid credentials: username=${message}`,
        'AuthService',
        401, // unauthorized
      );
    console.log('login user111111111111111111');
    return this.authService.login(message);
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('/google')
  // google(@Body() user): Promise<any> {
  //   return this.authService.google(user);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get("/me")
  // async myProfile(@Request() request, @AuthUser() authUser): Promise<any> {
  //   const user = await this.userService.findById(authUser.sub);

  //   return {
  //     ...plainToClass(User, user),
  //     authUser,
  //   };
  // }
}
