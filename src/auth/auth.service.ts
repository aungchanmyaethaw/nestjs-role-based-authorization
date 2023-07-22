import * as bcrypt from 'bcrypt';
import {
  Injectable,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import prisma from 'libs/prisma';
import { UsersService } from 'src/users/users.service';
import RegisterDto from './dtos/register.dto';
import LoginDto from './dtos/login.dto';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, username, name, roles } = registerDto;

    const user = await this.usersService.findOne({ email, username });

    if (user) {
      throw new HttpException('Username or email already exists!', 400);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { id } = await prisma.user.create({
      data: { email, hashedPassword, username, name, roles },
    });

    const payload = { email, username, name, id, roles };
    const token = await this.jwtService.signAsync(payload);

    return { ...payload, token };
  }

  async login(loginDto: LoginDto) {
    const { email, username, password } = loginDto;
    const user = await this.usersService.findOne({ email, username });
    if (!user) {
      throw new HttpException('Username or email does not exists!', 404);
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.hashedPassword,
    );

    if (!isPasswordCorrect) {
      throw new UnauthorizedException();
    }

    const payload = {
      email: user.email,
      username: user.username,
      name: user.name,
      id: user.id,
      roles: user.roles,
    };
    const token = await this.jwtService.signAsync(payload);

    return { ...payload, token };
  }
}
