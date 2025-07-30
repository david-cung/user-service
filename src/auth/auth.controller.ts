import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { LoginDto } from '@/user/dto/request/login.dto';
import { LoginResDto } from '@/user/dto/response/login-res.dto';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('login_user')
  async login(message: LoginDto): Promise<LoginResDto> {
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
