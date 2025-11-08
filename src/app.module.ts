import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './auth/api-key.guard';
import { TestModule } from './test/test.module';
import { InternalModule } from './internal/internal.module';
import { NotificationModule } from './notification/notification.module';
import { RecoverModule } from './recover/recover.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TestModule, InternalModule, NotificationModule, RecoverModule],
  controllers: [AppController],
  providers: [AppService, PrismaService,
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    }
  ],
  exports: [PrismaService]
})
export class AppModule { }
