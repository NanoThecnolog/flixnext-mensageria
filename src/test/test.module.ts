import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { Template } from 'service/template';
import { MailService } from 'util/CreateTransporter';

@Module({
  imports: [],
  controllers: [TestController],
  providers: [TestService, MailService, Template]
})
export class TestModule { }
