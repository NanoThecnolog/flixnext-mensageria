import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { RecoverProps } from '@types';
import { Template } from 'service/template';
import { MailService } from 'util/CreateTransporter';

@Injectable()
export class RecoverService {
    constructor(private readonly mailService: MailService, private readonly template: Template) { }

    async sendRecoverEmail(data: RecoverProps) {
        try {

            const { html, buffer } = this.template.generateRecoverTemplate(data.userName, data.token)
            const to = data.userEmail
            const subject = "Redefinição de Senha - FLIXNEXT"
            /**Alterar logica para receber o qrcode */
            const attachments = [
                {
                    filename: 'qrcode.jpg',
                    content: buffer,
                    cid: 'qrcode@pix'
                }
            ]
            return await this.mailService.sendMail(to, subject, html, undefined, attachments)
        } catch (err) {
            if (err.code === "ECONNREFUSED") throw new InternalServerErrorException('Erro ao tentar conectar com o servidor de email')
            if (err.code === "INVALID_EMAIL") throw new BadRequestException('O email fornecido é inválido.')
            throw new InternalServerErrorException("Erro ao enviar email de recuperação de senha")
        }
    }
}
