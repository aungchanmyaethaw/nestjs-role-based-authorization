import { Injectable } from '@nestjs/common';
import prisma from 'libs/prisma';

interface findOneProps {
  email?: string;
  username?: string;
}

@Injectable()
export class UsersService {
  async findOne({ email, username }: findOneProps) {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    return user ? user : null;
  }
}
