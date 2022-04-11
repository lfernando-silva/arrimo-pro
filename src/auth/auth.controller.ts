import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<{ message: string }> {
    await this.authService.signUp(createUserDto);
    return {
      message: 'User created successfully',
    };
  }

  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) loginDto: LoginUserDto,
  ): Promise<{ token: string }> {
    return await this.authService.signIn(loginDto);
  }
}
