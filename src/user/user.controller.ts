import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(@Query('page', ParseIntPipe) page: number) {
    return this.userService.getUsers(page);
  }

  @Post('faker')
  createFakeUsers() {
    return this.userService.createFakeUsers();
  }

  @Post()
  createUser(@Body() body) {
    return this.userService.createUser(body);
  }

  @Get('cart/:userId')
  getMyCartList(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.getMyCartList(userId);
  }

  @Post('cart')
  addBookToMyCart(@Body() body) {
    return this.userService.addBookToMyCart(body);
  }

  @Get('order/:userId')
  getOrderList(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.getOrderList(userId);
  }

  @Post('order/:userId')
  orderBook(@Body() body, @Param('userId', ParseIntPipe) userId: number) {
    return this.userService.orderBook(body, userId);
  }
}
