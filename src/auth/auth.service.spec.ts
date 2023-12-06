/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { NotFoundException } from '@nestjs/common';

describe('AuthserviceService', () => {
  let authService: AuthService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByUsername: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should verify password', async () => {
    const password = 'tespPassword';
    const passwordHash = await bcrypt.hash(password, 10);
    expect(await authService.verifyPassword(password, passwordHash)).toBe(true);
    expect(
      await authService.verifyPassword('wrongPassword', passwordHash),
    ).toBe(false);
  });

  it('should sign in successfully', async () => {
    const username = 'testUser';
    const password = 'testPassword';
    const result = await authService.signIn(username, password);
    expect(result).toHaveProperty('accessToken');
    expect(result.accessToken).toEqual('mockToken');
  });

  it('should throw NotFoundException when sign in fails', async () => {
    const username = 'testUser';
    const password = 'testPassword';

    jest.spyOn(usersService, 'findByUsername').mockResolvedValue(null);

    await expect(authService.signIn(username, password)).rejects.toThrow(
      NotFoundException,
    );
  });
});
