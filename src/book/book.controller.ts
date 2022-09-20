import { Controller, Get, ParseIntPipe, Post, Query } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getBooks(@Query('page', ParseIntPipe) page: number) {
    return this.bookService.getBooks(page);
  }

  @Post('faker')
  createFakeBooks() {
    return this.bookService.createFakeBooks();
  }
}
