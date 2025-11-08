import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ActivateConfirmationDTO, NewUserAccountDTO, NewUserDTO, ProblemNotificationDTO, RecoverDTO, RequestDTO } from './dto/email.dto';
import { ApiOperation } from '@nestjs/swagger';
import { Public } from './decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Public()
  @Get()
  getHello() {
    return this.appService.getActive();
  }
}