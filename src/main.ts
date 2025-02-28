import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiKeyGuard } from './auth/api-key.guard';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const PORT = process.env.PORT;
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalGuards(new ApiKeyGuard(configService));
  await app.listen(PORT ?? 3000, () => {
    console.log(`Servidor de mensageria rodando na porta ${PORT}`);
  });
}
bootstrap();