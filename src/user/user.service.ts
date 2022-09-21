import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(page = 1) {
    const limit = 10;

    const [totalCount, users] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          id: 'desc',
        },
        select: {
          id: true,
          email: true,
          userInfo: {
            select: {
              id: true,
              userId: true,
            },
          },
        },
      }),
    ]);

    return {
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      users,
    };
  }

  async createFakeUsers() {
    const arr = await Promise.all(
      Array(25)
        .fill(0)
        .map(() =>
          this.prisma.user.create({
            data: {
              email: faker.internet.email(),
              userInfo: {
                create: {
                  password: faker.datatype.uuid(),
                },
              },
            },
          }),
        ),
    );
    return arr.length;
  }

  createUser(payload) {
    return this.prisma.user.create({
      data: {
        email: payload.email,
        userInfo: {
          create: {
            password: payload.password,
          },
        },
      },
      include: {
        userInfo: true,
      },
    });
  }

  async getMyCartList(userId: number) {
    return this.prisma.cart.findMany({
      where: {
        userId,
      },
    });
  }

  async addBookToMyCart(body: any) {
    return await this.prisma.cart.create({
      data: {
        userId: Number(body.userId),
        bookId: Number(body.bookId),
      },
    });
  }
}
