import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthEntity } from './entity/auth.entity';

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

  async signIn(username: string, password: string): Promise<AuthEntity> {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const passwordIsValid = await this.verifyPassword(password, user?.password);

    if (!passwordIsValid) {
      throw new NotFoundException();
    }

    // const payload = { sub: user?.id, username: user?.username };
    const payload = { userId: user?.id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
