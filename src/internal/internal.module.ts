import { Module } from '@nestjs/common';
import { InternalController } from './internal.controller';
import { InternalService } from './internal.service';
import { Template } from 'service/template';
import { MailService } from 'util/CreateTransporter';

@Module({
  imports: [],
  controllers: [InternalController],
  providers: [InternalService, MailService, Template]
})
export class InternalModule { }
