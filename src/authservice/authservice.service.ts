import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async verifyPassword(password: string, passwordHash: string) {
    const verifiedPassword = await bcrypt.compare(password, passwordHash);
    return verifiedPassword;
  }

  async signIn(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    const passwordIsValid = await this.verifyPassword(password, user?.password);

    if (!passwordIsValid) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user?.id, username: user?.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
