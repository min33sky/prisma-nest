import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

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
    // return await this.book.findUnique({
    //   where: {
    //     id: bookId,
    //   },
    // });
    //? Raw SQL query (속도가 더 빠름)
    const author = 'Marcelina_';
    //* 방법 1
    // return await this
    //   .$queryRaw`SELECT * FROM "Book" WHERE author = ${author} OR id = ${bookId}`;
    //* 방법 2
    return await this.$queryRaw(
      Prisma.sql`SELECT * FROM "Book" WHERE author = ${author} OR id = ${bookId}`,
    );
  }

  async getBooksWithPagination(page = 1) {
    return await this.book.findMany({
      skip: (page - 1) * 10,
      take: 10,
    });
  }
}
