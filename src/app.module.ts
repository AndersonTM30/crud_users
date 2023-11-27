import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './users/users.service';
import { AuthController } from './auth/auth.controller';
import { JwtAuthGuard } from './auth/auth.guard';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: 60 },
    }),
  ],
  providers: [AuthService, UsersService, JwtAuthGuard],
  controllers: [AuthController],
  // providers: [JwtAuthGuard],
  exports: [AuthService],
})
export class AppModule {}
