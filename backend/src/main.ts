import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { HttpExceptionFIlter } from './common/exceptions/exception.filter';
import { join } from 'path';

async function bootstrap() {
  //* Local , Remote 환경 구분
  const isLocal = process.env.SERVER_MODE === 'local' ? true : false;

  //* key ,cert load

  const httpsOptions = isLocal
    ? null
    : {
        key: fs.readFileSync('/etc/letsencrypt/live/f1rstweb.shop/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/f1rstweb.shop/cert.pem'),
      };

  //* Local ( http ), Remote ( https )
  const app = isLocal
    ? await NestFactory.create<NestExpressApplication>(AppModule)
    : await NestFactory.create<NestExpressApplication>(AppModule, {
        httpsOptions,
      });

  //* Static Assets
  app.useStaticAssets(join(__dirname, '..', 'public'));

  //* 전역으로 Pipes 설정
  app.useGlobalPipes(new ValidationPipe());

  //* 전역으로 Filter 설정
  app.useGlobalFilters(new HttpExceptionFIlter());

  //* Swagger 설정.
  const swaggerConfig = new DocumentBuilder()
    .setTitle('비슷하구만그램')
    .setDescription('인스타그램 클론코딩')
    .setVersion('1.0.0')
    .addTag('instagram')
    .build();

  //* Swagger Setup
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, swaggerDocument);

  //* Cors Setting
  app.enableCors({
    origin: true,
    credentials: true,
    exposedHeaders: ['Authorization', 'RefreshToken'],
  });

  if (isLocal)
    await app.listen(process.env.HTTP_PORT, () => {
      Logger.log(`${process.env.HTTP_PORT} 포트 실행 HTTP`);
    });
  if (!isLocal)
    await app.listen(process.env.HTTPS_PORT, () => {
      Logger.log(`${process.env.HTTPS_PORT} 포트 실행 hTTPS`);
    });
}
bootstrap();
