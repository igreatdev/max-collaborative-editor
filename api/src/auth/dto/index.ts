import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Users } from 'src/models';

export class UserLoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  readonly password: string;
}

export class UserForgotPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}

export class UserResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

export class UserRegisterDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  readonly email?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(3)
  readonly first_name?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(3)
  readonly last_name?: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly password?: string;
}

export class UserResponseDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly first_name: string;

  @ApiProperty()
  readonly last_name: string;

  @ApiProperty()
  readonly created_at: string;

  @ApiProperty()
  readonly updated_at: string;
}

export const userResponseDto = (data: Users): UserResponseDto => {
  return {
    id: data.id,
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
    created_at: data.createdAt,
    updated_at: data.updatedAt,
  };
};
