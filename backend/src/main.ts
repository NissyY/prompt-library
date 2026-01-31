import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from '@/app.module';

async function bootstrap() {
  const logger = new Logger('Server');
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
  logger.log(`Application is running on: ${process.env.PORT ?? 3000}`);
}
bootstrap();
