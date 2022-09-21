import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { BookRepository } from './prisma/book.repository';
import { UserRepository } from './prisma/user.repository';

@Injectable()
export class AppService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bookRepository: BookRepository,
    @Inject(CACHE_MANAGER) private redis,
  ) {}

  async getHello() {
    return this.redis.get('hello');
  }

  async setHello() {
    return this.redis.set('hello', 'world');
  }

  async getTesting() {
    // return await Promise.all([
    //   this.userRepository.findUserById(1),
    //   this.userRepository.getUsersWithPagination(),
    //   this.bookRepository.findBookById(1),
    //   this.bookRepository.getBooksWithPagination(),
    // ]);
    return await this.bookRepository.findBookById(80000);
  }
}
