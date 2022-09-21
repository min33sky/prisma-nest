import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    BookModule,
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
      ttl: 10, // 지속 시간(초)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
