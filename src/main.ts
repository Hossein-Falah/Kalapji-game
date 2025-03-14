import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './modules/app/app.module';
import { SwaggerConfigInit } from './configs/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  SwaggerConfigInit(app);
  app.use(cookieParser(configService.get<string>("COOKIE_SECRET")))
  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(`Server is running or http://localhost:${process.env.PORT}`),
    console.log(`Swagger is running http://localhost:${process.env.PORT}/swagger`)
  });
}
bootstrap();
