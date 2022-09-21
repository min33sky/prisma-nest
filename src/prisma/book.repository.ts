import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class BookRepository extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  async findBookById(bookId: number) {
    return await this.book.findUnique({
      where: {
        id: bookId,
      },
    });
  }

  async getBooksWithPagination(page = 1) {
    return await this.book.findMany({
      skip: (page - 1) * 10,
      take: 10,
    });
  }
}
