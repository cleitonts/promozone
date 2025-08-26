import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AppLogger } from './common/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new AppLogger(),
  });



  app.enableCors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'X-Custom-Header',
    ],
    exposedHeaders: ['Content-Length', 'X-Custom-Header'],
    credentials: true,
    maxAge: 3600, // 1 hora de cache para preflight
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });



  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Habilita transformações nos DTOs
      // whitelist: true, // Remove propriedades não definidas no DTO
      // forbidNonWhitelisted: true, // Rejeita requisições com propriedades extras
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
