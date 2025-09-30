import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Brain Agriculture API')
    .setDescription(
      'API para gerenciamento de produtores rurais e suas fazendas.',
    )
    .setVersion('1.0')
    .addTag('dashboard', 'Endpoint de agregação de dados')
    .addTag('producers', 'Endpoints relacionados a produtores')
    .addTag('farms', 'Endpoints relacionados a fazendas')
    .addTag('planted-crops', 'Endpoints relacionados a culturas plantadas')
    .addTag('cultures', 'Endpoints relacionados a culturas')
    .addTag('harvests', 'Endpoints relacionados a safras')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
