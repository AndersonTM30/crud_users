import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'string',
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'string',
  })
  password: string;
}
