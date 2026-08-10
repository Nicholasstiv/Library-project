import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, // remove non-declared dto properties
      forbidNonWhitelisted: true, // throw a 400 error if there is extra properties instead of just removing
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
