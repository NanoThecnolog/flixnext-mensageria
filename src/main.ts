import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiKeyGuard } from './auth/api-key.guard';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const PORT = process.env.PORT;
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalGuards(new ApiKeyGuard(configService));
  const config = new DocumentBuilder()
    .setTitle('Mensageria FlixNext')
    .setDescription('API de envio de emails')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)
  await app.listen(PORT ?? 3000, () => {
    console.log(`Servidor de mensageria rodando na porta ${PORT}`);
  });
}
bootstrap();