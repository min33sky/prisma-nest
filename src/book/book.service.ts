import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}

  async getBooks(page = 1) {
    const limit = 10;

    const [totalCount, books] = await Promise.all([
      this.prisma.book.count(),
      this.prisma.book.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          id: 'desc',
        },
      }),
    ]);

    return {
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      books,
    };
  }

  async createFakeBooks() {
    const data = Array(10000)
      .fill(0)
      .map(() => ({
        title: faker.lorem.lines().slice(0, 40),
        publisher: faker.company.bs().slice(0, 20),
        author: faker.internet.userName().slice(0, 10),
        price: Math.ceil(Math.random() * 20) * 1000 || 1000,
      }));

    return await this.prisma.book.createMany({
      data,
    });
  }

  async getBookReview(bookId: number) {
    return await this.prisma.review.findMany({
      where: {
        bookId,
      },
      include: {
        user: true,
      },
    });
  }

  async createBookReview(payload: any, bookId: number) {
    return await this.prisma.review.create({
      data: {
        bookId,
        userId: Number(payload.userId),
        content: payload.content,
        rating:
          Number(payload.rating) > 5
            ? 5
            : Number(payload.rating) < 0
            ? 0
            : Number(payload.rating),
      },
    });
  }
}
