import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getBooks(@Query('page', ParseIntPipe) page: number) {
    return this.bookService.getBooks(page);
  }

  @Post()
  createBook(@Body() body) {
    return this.bookService.createBook(body);
  }

  @Post('faker')
  createFakeBooks() {
    return this.bookService.createFakeBooks();
  }

  @Get('review/:bookId')
  getBookReview(@Param('bookId') bookId: string) {
    return this.bookService.getBookReview(Number(bookId));
  }

  @Post('review/:bookId')
  createBookeReview(@Body() body, @Param('bookId') bookId: string) {
    return this.bookService.createBookReview(body, Number(bookId));
  }

  @Get('search')
  searchBooks(@Query('keyword') keyword: string) {
    return this.bookService.searchBooks(keyword);
  }

  @Get('category')
  getCategories() {
    return this.bookService.getCategories();
  }

  @Post('category')
  createCategory(@Body('name') name) {
    return this.bookService.createCategory(name);
  }
}
