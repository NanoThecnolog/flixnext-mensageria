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

  @Post('/email/test')
  @ApiOperation({ summary: 'email test' })
  async sendEmailTeste(@Body() obj: { str: string }) {
    return this.appService.sendEmailTest(obj.str)
  }

  //Notificação de usuário novo
  @Post('/system/new/user')
  @ApiOperation({ summary: 'Notificação para o sistema de novo usuário' })
  async sendNewAccountNotification(@Body() user: NewUserDTO) {
    return this.appService.sendNewAccountNotification(user)
  }
  //Email de notificação de conta criada para o usuário
  @Post('/user/new')
  @ApiOperation({ summary: 'Notificação para usuário de nova conta' })
  async sendNewAccountUserNotification(@Body() data: NewUserAccountDTO) {
    return this.appService.sendNewAccountUserNotification(data)
  }
  //Email de confirmação de ativação de conta
  @Post('/user/confirmation')
  async sendActivateConfirmation(@Body() data: ActivateConfirmationDTO) {
    return this.appService.sendActivateConfirmation(data)
  }

  //Notificação de problemas
  @Post('/system/problem')
  @ApiOperation({ summary: 'Notificação para o sistema sobre problema com arquivos' })
  async sendProblemNotification(@Body() data: ProblemNotificationDTO) {
    return this.appService.sendProblemNotification(data)
  }
  @Post('/info')
  @ApiOperation({ summary: 'Email informativo do sistema' })
  async sendInfoEmail() {
    return this.appService.sendInfoEmail()
  }
  //Emails promocionais
  @Post('/promotional/send')
  @ApiOperation({ summary: 'Envio de emails promocionais' })
  async sendPromotionalEmail() {
    return this.appService.sendPromotionalEmail()
  }
  //Emails de solicitações de conteudo
  @Post('/system/request')
  @ApiOperation({ summary: 'Envio de Solicitações de conteúdo' })
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