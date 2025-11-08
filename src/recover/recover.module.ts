import { Module } from '@nestjs/common';
import { RecoverController } from './recover.controller';
import { RecoverService } from './recover.service';
import { Template } from 'service/template';
import { MailService } from 'util/CreateTransporter';

@Module({
  imports: [],
  controllers: [RecoverController],
  providers: [RecoverService, MailService, Template]
})
export class RecoverModule { }
