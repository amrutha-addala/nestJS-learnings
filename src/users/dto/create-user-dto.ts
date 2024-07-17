import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Entity } from 'typeorm';

@Entity('users')
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
