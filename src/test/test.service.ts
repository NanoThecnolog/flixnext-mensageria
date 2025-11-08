import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Template } from 'service/template';
import { MailService } from 'util/CreateTransporter';

@Injectable()
export class TestService {
    constructor(private readonly template: Template, private readonly mailService: MailService) { }

    async sendEmailTest(str: string) {
        //console.log(str)
        try {
            const html = this.template.generateEmailTest(str)
            const to = "ericssongomes.fotografia@gmail.com"
            const subject = "Email de teste"
            return await this.mailService.sendMail(to, subject, html)
        } catch (err) {
            if (err.code === "ECONNREFUSED") throw new InternalServerErrorException('Erro ao tentar conectar com o servidor de email')
            if (err.code === "INVALID_EMAIL") throw new BadRequestException('O email fornecido é inválido.')

            throw new BadRequestException('Erro ao enviar email teste')
        }
    }
    async testTemplates() {
        try {
            const html = this.template.generatePromotionalTemplate('teste')
            const to = "ericssongomes.fotografia@gmail.com"
            const subject = "Email de teste"
            return await this.mailService.sendMail(to, subject, html)
        } catch (err) {
            if (err.code === "ECONNREFUSED") throw new InternalServerErrorException('Erro ao tentar conectar com o servidor de email')
            if (err.code === "INVALID_EMAIL") throw new BadRequestException('O email fornecido é inválido.')

            throw new BadRequestException('Erro ao enviar email teste')
        }
    }
}
