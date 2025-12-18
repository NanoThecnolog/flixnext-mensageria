import { Body, Controller, Get, Post } from '@nestjs/common';
import { ActivateConfirmationDTO, NewUserAccountDTO, ProblemNotificationDTO, RequestDTO } from 'src/dto/email.dto';
import { NotificationService } from './notification.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('notification')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) { }


    //Email de confirmação de ativação de conta
    @Post('user/confirmation')
    async sendActivateConfirmation(@Body() data: ActivateConfirmationDTO) {

        return this.notificationService.sendActivateConfirmation(data)
    }

    //Notificação de problemas
    @ApiOperation({ summary: 'Notificação para o sistema sobre problema com arquivos' })
    @Post('problem')
    async sendProblemNotification(@Body() data: ProblemNotificationDTO) {
        return this.notificationService.sendProblemNotification(data)
    }

    //Email de notificação de conta criada para o usuário
    @ApiOperation({ summary: 'Notificação para usuário de nova conta' })
    @Post('user/new')
    async sendNewAccountUserNotification(@Body() data: NewUserAccountDTO) {
        return this.notificationService.sendNewAccountUserNotification(data)
    }

    @ApiOperation({ summary: 'Email informativo do sistema' })
    @Get('info')
    async sendInfoEmail() {
        return this.notificationService.sendInfoEmail()
    }

    //Emails promocionais
    @Post('promotional')
    @ApiOperation({ summary: 'Envio de emails promocionais' })
    async sendPromotionalEmail(@Body() body: { series: { link: string; name: string; image: string }[], movies: { link: string; name: string; image: string }[] }) {
        return this.notificationService.sendPromotionalEmail(body.series, body.movies)
    }

    //Emails de solicitações de conteudo
    @Post('request')
    @ApiOperation({ summary: 'Envio de Solicitações de conteúdo' })
    async sendRequest(@Body() data: RequestDTO) {
        return this.notificationService.sendRequestEmail(data)
    }

    @Post('about-subscription')
    async sendEmailAboutSubs() {
        return this.notificationService.sendEmailAboutSubscription()
    }
}
