import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthorModule } from './authors/author.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthorModule,
    UsersModule,
    AuthModule,
    BooksModule,
  ],
  providers: [AppService],
})
export class AppModule {}
