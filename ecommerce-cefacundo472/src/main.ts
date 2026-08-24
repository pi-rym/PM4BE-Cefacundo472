import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { environment } from './config/enviroment';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

 const config = new DocumentBuilder()
    .setTitle('Proyecto Integrador M4-Back')
    .setDescription('Proyecto desarrollado con NestJs')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
   const documentFactory = () => SwaggerModule.createDocument(app, config);
   SwaggerModule.setup('api', app, documentFactory);



 const PORT = Number(environment.port);
 const HOST = environment.host;

  await app.listen(PORT);

  console.log(`Servidor escuchando en http://${HOST}:${PORT}/`);
}
bootstrap();
