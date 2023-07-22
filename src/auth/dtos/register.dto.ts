import { IsEmail, MinLength, IsStrongPassword, IsEnum } from 'class-validator';
export default class RegisterDto {
  @MinLength(4)
  username: string;
  @IsEmail()
  email: string;
  @IsStrongPassword()
  password: string;
  @MinLength(4)
  name?: string;
  @IsEnum(['ADMIN', 'USER'])
  roles: string;
}
