import { faker } from '@faker-js/faker';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private redis,
  ) {
    prisma.$on<any>('query', (e: Prisma.QueryEvent) => {
      console.log(e.query);
      console.log(e.params);
      console.log(e.duration);
    });
  }

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

  async createBook(body) {
    return await this.prisma.book.create({
      data: {
        title: 'test',
        publisher: 'test',
        author: 'test',
        price: 10000,
        category: {
          connect: {
            id: 1,
          },
        },
      },
      include: {
        category: true,
      },
    });
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

  async searchBooks(keyword: string) {
    const cache = await this.redis.get(`GET /book/search?name=${keyword}`);

    if (cache) {
      console.log('cached data...');
      return cache;
    }

    console.log('uncached data...');
    const data = await this.prisma.book.findMany({
      where: {
        title: {
          // contains: keyword, //? ?????? prisma ?????? ??????
          search: `${keyword} & porro`, //? full-text-search ?????? (prisma preview feature ?????? ??????)
        },
      },
    });

    this.redis.set(`GET /book/search?name=${keyword}`, data, { ttl: 60 });
    return data;
  }

  async getCategories() {
    return this.prisma.category.findMany({
      include: {
        books: true,
      },
    });
  }

  async createCategory(name: string) {
    return await this.prisma.category.create({
      data: {
        name,
        books: {
          connect: [
            {
              id: 79999,
            },
            {
              id: 80000,
            },
          ],
        },
      },
    });
  }

  async changeAuthor() {
    //? ????????? Raw??? ?????? ??????
    return await this.prisma
      .$executeRaw`UPDATE "Book" SET author = ${'changed'} WHERE author = ${'Andreanne3'}`;
  }
}
