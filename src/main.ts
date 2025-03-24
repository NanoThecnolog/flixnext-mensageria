import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiKeyGuard } from './auth/api-key.guard';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from './interceptors/exception.interceptor';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const PORT = process.env.PORT || 4556;
  const origin = process.env.CORS_ORIGIN;
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);


  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization', 'key'],
    credentials: true,
  });

  //app.useGlobalGuards(new ApiKeyGuard(configService));
  app.useGlobalInterceptors(new ResponseInterceptor())
  //app.useGlobalPipes(new ValidationPipe())
  const config = new DocumentBuilder()
    .setTitle('Mensageria FlixNext')
    .setDescription('API de envio de emails')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)
  await app.listen(PORT, () => {
    console.log(`Servidor de mensageria rodando na porta ${PORT}`);
  });
}
bootstrap();