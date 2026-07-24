import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule,
    BooksModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
