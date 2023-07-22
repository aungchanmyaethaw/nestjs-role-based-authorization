import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import RegisterDto from './dtos/register.dto';
import LoginDto from './dtos/login.dto';
import { Public } from 'src/roles/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('register')
  async register(@Body(new ValidationPipe()) registerDto: RegisterDto) {
    try {
      return this.authService.register(registerDto);
    } catch (error) {
      throw new Error(error);
    }
  }
  @Public()
  @Post('login')
  async login(@Body(new ValidationPipe()) loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
