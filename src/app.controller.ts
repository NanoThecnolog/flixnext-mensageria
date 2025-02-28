import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { NewUserDTO, ProblemNotificationDTO } from './dto/email.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello() {
    return this.appService.getActive();
  }

  //Notificação de usuário novo
  @Post('/notification/new/user')
  async sendNewAccountNotification(@Body() user: NewUserDTO) {
    return this.appService.sendNewAccountNotification(user)
  }

  //Notificação de problemas
  @Post('/notification/problem')
  async sendProblemNotification(@Body() data: ProblemNotificationDTO) {
    return this.appService.sendProblemNotification(data)
  }
  //Emails promocionais
  @Post('/promotional/send')
  async sendPromotionalEmail() {
    return this.appService.sendPromotionalEmail()
  }

  @Post('/email/test')
  async sendEmailTeste(@Body() obj: { str: string }) {
    console.log(obj)
    return this.appService.sendEmailTest(obj.str)
  }
}
