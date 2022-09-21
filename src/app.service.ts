import { Injectable } from '@nestjs/common';
import { BookRepository } from './prisma/book.repository';
import { UserRepository } from './prisma/user.repository';

@Injectable()
export class AppService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bookRepository: BookRepository,
  ) {}

  async getTesting() {
    return await Promise.all([
      this.userRepository.findUserById(1),
      this.userRepository.getUsersWithPagination(),
      this.bookRepository.findBookById(1),
      this.bookRepository.getBooksWithPagination(),
    ]);
  }
}
