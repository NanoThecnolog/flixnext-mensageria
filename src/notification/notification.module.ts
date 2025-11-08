import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { MailService } from 'util/CreateTransporter';
import { Template } from 'service/template';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [],
  controllers: [NotificationController],
  providers: [NotificationService, MailService, Template, PrismaClient]
})
export class NotificationModule { }
