import { IsEmail, MinLength, IsString, IsOptional } from 'class-validator';
export default class LoginDto {
  @IsEmail()
  @IsOptional()
  email?: string;
  @IsOptional()
  username?: string;
  @IsString()
  password: string;
}
