import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { NewUserDTO, ProblemNotificationDTO, RecoverDTO, RequestDTO } from './dto/email.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello() {
    return this.appService.getActive();
  }

  @Post('/email/test')
  @ApiOperation({ summary: 'email test' })
  async sendEmailTeste(@Body() obj: { str: string }) {
    return this.appService.sendEmailTest(obj.str)
  }

  //Notificação de usuário novo
  @Post('/notification/new/user')
  @ApiOperation({ summary: 'Notificação de novo usuário' })
  async sendNewAccountNotification(@Body() user: NewUserDTO) {
    return this.appService.sendNewAccountNotification(user)
  }

  //Notificação de problemas
  @Post('/notification/problem')
  @ApiOperation({ summary: 'Notificação de problema com arquivos' })
  async sendProblemNotification(@Body() data: ProblemNotificationDTO) {
    return this.appService.sendProblemNotification(data)
  }
  //Emails promocionais
  @Post('/promotional/send')
  @ApiOperation({ summary: 'Envio de emails promocionais' })
  async sendPromotionalEmail() {
    return this.appService.sendPromotionalEmail()
  }
  //Emails de solicitações de filmes e séries
  @Post('/request')
  @ApiOperation({ summary: 'Envio de Solicitações de filmes e séries' })
  async sendRequest(@Body() data: RequestDTO) {
    return this.appService.sendRequestEmail(data)
  }
  //Emails de recuperação de conta
  @Post('/user/recover')
  @ApiOperation({ summary: 'Envio de email de recuperação de conta' })
  async sendRecover(@Body() data: RecoverDTO) {
    return this.appService.sendRecoverEmail(data)
  }
}
