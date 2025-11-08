import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Template } from 'service/template';
import { NewUserDTO } from 'src/dto/email.dto';
import { MailService } from 'util/CreateTransporter';

@Injectable()
export class InternalService {
    constructor(private readonly mailService: MailService, private readonly template: Template) {
    }

    async sendNewAccountNotification(data: NewUserDTO) {

        try {
            const html = this.template.generateNewAccNotificationContent(data)
            const to = "ericssongomes.fotografia@gmail.com"
            const subject = "Um Novo usuário foi cadastrado na plataforma!"
            const sendEmail = await this.mailService.sendMail(to, subject, html)
            return sendEmail
        } catch (err) {
            if (err.code === "ECONNREFUSED") throw new InternalServerErrorException('Erro ao tentar conectar com o servidor de email')
            if (err.code === "INVALID_EMAIL") throw new BadRequestException('O email fornecido é inválido.')

            throw new InternalServerErrorException("Erro ao enviar email de Notificação")
        }
    }
}
