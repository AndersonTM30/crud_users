import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './authservice.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;

    const token = await this.authService.signIn(username, password);

    if (!token) throw new UnauthorizedException('Invalid username or password');

    return token;
  }
}
