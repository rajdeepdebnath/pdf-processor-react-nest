import { NestFactory } from '@nestjs/core';
import { PdfModule } from './pdf/pdf.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(PdfModule);

  const config = new DocumentBuilder()
    .setTitle('Pdf')
    .setDescription('Pdf api')
    .setVersion('1.0')
    .addTag('Pdf')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
