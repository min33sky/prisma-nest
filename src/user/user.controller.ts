import {
  Body,
  Controller,
  Get,
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
}
