import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { environment } from './config/enviroment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const PORT = Number(environment.port);
  const HOST = environment.host;

  await app.listen(PORT);

  console.log(`Servidor escuchando en http://${HOST}:${PORT}/`);
}
bootstrap();
