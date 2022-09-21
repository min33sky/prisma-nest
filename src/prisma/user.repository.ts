import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserRepository extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  async findUserById(userId: number) {
    return await this.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async getUsersWithPagination(page = 1) {
    return await this.user.findMany({
      skip: (page - 1) * 10,
      take: 10,
    });
  }
}
