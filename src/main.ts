import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const securitySchemes = {
  //   bearer: {
  //     type: 'http',
  //     scheme: 'bearer',
  //     bearerFormat: 'JWT',
  //   },
  // };

  // const security = {
  //   bearer: [],
  // };

  // const options = {
  //   swaggerOptions: {
  //     securitySchemes: securitySchemes,
  //     security: security,
  //   },
  //  };

  const config = new DocumentBuilder()
    .setTitle('Finances API')
    .setDescription('The Finances API')
    .setVersion('0.1')
    .addBearerAuth()
    .addSecurity('bearer', {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
