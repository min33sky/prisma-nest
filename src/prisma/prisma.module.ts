import { Global, Module } from '@nestjs/common';
import { BookRepository } from './book.repository';
import { PrismaService } from './prisma.service';
import { UserRepository } from './user.repository';

@Global()
@Module({
  providers: [PrismaService, UserRepository, BookRepository],
  exports: [PrismaService, UserRepository, BookRepository],
})
export class PrismaModule {}
