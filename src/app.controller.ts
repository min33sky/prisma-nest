import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello() {
    return this.appService.getHello();
  }

  @Post('hello')
  setHello() {
    return this.appService.setHello();
  }

  @Get()
  getTesting() {
    return this.appService.getTesting();
  }
}
