import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ActivatedAccProps, NewAccountUserProps, ProblemTemplateProps, RequestProps } from '@types';
import { Template } from 'service/template';
import { MailService } from 'util/CreateTransporter';
import { getAllUsers } from 'util/GetDB';

@Injectable()
export class NotificationService {
    constructor(private readonly mailService: MailService, private readonly template: Template, private readonly prisma: PrismaClient) { }

    async sendActivateConfirmation(data: ActivatedAccProps) {
        try {
            const html = this.template.generateActivatedConfirmation(data)
            const to = data.email
            const subject = "Conta Ativada com Sucesso!"

            const base64 = data.qrCode.replace(/^data:image\/\w+;base64,/, '')
            const buffer = Buffer.from(base64, 'base64')

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
            throw new InternalServerErrorException("Erro ao enviar email de confimação de ativação")
        }
    }

    async sendProblemNotification(data: ProblemTemplateProps) {
        try {
            const html = this.template.generateProblemTemplate(data)
            const to = "ericssongomes.fotografia@gmail.com"
            const subject = "Notificação de problema com arquivo"
            return await this.mailService.sendMail(to, subject, html)
        } catch (err) {
            if (err.code === "ECONNREFUSED") throw new InternalServerErrorException('Erro ao tentar conectar com o servidor de email')
            if (err.code === "INVALID_EMAIL") throw new BadRequestException('O email fornecido é inválido.')
            throw new InternalServerErrorException("Erro ao enviar email de notificação de problema")
        }
    }
    async sendNewAccountUserNotification(data: NewAccountUserProps) {
        if (!data) throw new BadRequestException("Informações não enviadas.")
        try {
            const html = this.template.generateNewAccUserNotify(data)
            const subject = "Incrível! Sua conta na FlixNext foi criada!"
            const base64 = data.qrCode.replace(/^data:image\/\w+;base64,/, '')
            const buffer = Buffer.from(base64, 'base64')

            const attachments = [
                {
                    filename: 'qrcode.jpg',
                    content: buffer,
                    cid: 'qrcode@pix'
                }
            ]
            return await this.mailService.sendMail(data.email, subject, html, undefined, attachments)
        } catch (err) {
            if (err.code === "ECONNREFUSED") throw new InternalServerErrorException('Erro ao tentar conectar com o servidor de email')
            if (err.code === "INVALID_EMAIL") throw new BadRequestException('O email fornecido é inválido.')
            console.log(err)
            throw new InternalServerErrorException("Erro ao enviar email de nova conta para o usuário.")
        }
    }
    async sendInfoEmail() {
        const users = await getAllUsers()
        const { default: pLimit } = await import('p-limit');
        const limit = pLimit(5)

        try {
            const emailPromises = users.map(async (user) => {
                limit(async () => {
                    try {
                        if (user.news) {
                            const html = this.template.generateEmailInfo(user.name)
                            const to = user.email
                            const subject = "Informativo FlixNext"
                            const send = await this.mailService.sendMail(to, subject, html)
                            console.log(`Email enviado para ${user.email}`)
                            return { email: user.email, status: "success", response: send.response }
                        }
                    } catch (err) {
                        console.error(`Erro ao enviar email para ${user.email}:`, err)
                        return { email: user.email, status: "error", error: err.message }
                    }
                })

            })
            const results = await Promise.allSettled(emailPromises)

            const errors = results.filter(r => r.status === 'rejected')
            if (errors.length > 0) {
                console.warn(`${errors.length} emails falharam ao serem enviados`)
            }
            return "Emails enviados"
        } catch (err) {
            console.error("Erro ao processar o envio de emails:", err);
            if (err.code === "ECONNREFUSED") throw new InternalServerErrorException('Erro ao tentar conectar com o servidor de email')
            if (err.code === "INVALID_EMAIL") throw new BadRequestException('O email fornecido é inválido.')
            throw new InternalServerErrorException("Erro ao enviar email promocional")
        }
    }

    async sendPromotionalEmail(
        series: { link: string; name: string; image: string }[],
        movies: { link: string; name: string; image: string }[],
    ) {
        const users = await getAllUsers()
        const { default: pLimit } = await import('p-limit');
        const limit = pLimit(5)

        try {
            const emailPromises = users.map(async (user) => {
                limit(async () => {
                    try {
                        if (user.news) {
                            const html = this.template.generatePromotionalTemplate(user.name, series, movies)
                            const to = user.email
                            const subject = "Muita Novidade e Diversão para o seu 2025!"
                            const send = await this.mailService.sendMail(to, subject, html)
                            console.log(`Email enviado para ${user.email}`)
                            return { email: user.email, status: "success", response: send.response }
                        }
                    } catch (err) {
                        console.error(`Erro ao enviar email para ${user.email}:`, err)
                        return { email: user.email, status: "error", error: err.message }
                    }
                })
            })
            const results = await Promise.allSettled(emailPromises)

            const errors = results.filter(r => r.status === 'rejected')
            if (errors.length > 0) {
                console.warn(`${errors.length} emails falharam ao serem enviados`)
            }
            return "Emails enviados"
        } catch (err) {
            console.error("Erro ao processar o envio de emails:", err);
            if (err.code === "ECONNREFUSED") throw new InternalServerErrorException('Erro ao tentar conectar com o servidor de email')
            if (err.code === "INVALID_EMAIL") throw new BadRequestException('O email fornecido é inválido.')
            throw new InternalServerErrorException("Erro ao enviar email promocional")
        }
    }

    async sendRequestEmail(data: RequestProps) {
        const userExiste = await this.prisma.user.findUnique({
            where: { email: data.email }
        })
        if (!userExiste) throw new Error("Usuário não existe!")
        try {
            const html = this.template.generateRequestTemplate(data)
            const to = 'ericssongomes.fotografia@gmail.com'
            const subject = 'Solicitação de Conteúdo'
            return await this.mailService.sendMail(to, subject, html)
        } catch (err) {
            if (err.code === "ECONNREFUSED") throw new InternalServerErrorException('Erro ao tentar conectar com o servidor de email')
            if (err.code === "INVALID_EMAIL") throw new BadRequestException('O email fornecido é inválido.')
            throw new InternalServerErrorException("Erro ao enviar email de Solicitação de conteúdo")
        }
    }
    async sendEmailAboutSubscription() {
        const users = await getAllUsers()
        const { default: pLimit } = await import('p-limit');
        const limit = pLimit(2)

        try {
            const tasks = users
                .filter(user => user.news)
                .map(user =>
                    limit(async () => {
                        try {
                            const html = this.template.generateEmailInfoAboutSubscriptions(user.name)
                            const to = user.email
                            const subject = "Novo sistema de assinaturas – um passo importante para a continuidade da plataforma"
                            await this.mailService.sendMail(to, subject, html)
                            console.log(`Email enviado para ${user.email}`)
                            return { email: user.email, status: 'success' }
                        } catch (err) {
                            console.error(`Erro ao enviar email para ${user.email}:`, err.message)

                            // erro de rate limit SMTP → parar imediatamente
                            if (err?.responseCode === 450 || err?.code === 'EAUTH') {
                                throw err
                            }

                            return { email: user.email, status: 'error', error: err.message }
                        }
                    })
                )

            const results = await Promise.allSettled(tasks)

            const failed = results.filter(r => r.status === 'rejected')
            if (failed.length) {
                console.warn(`${failed.length} emails falharam`)
            }
            return 'Processo de envio finalizado'
        } catch (err) {
            console.error("Erro crítico no envio de emails:", err);
            if (err?.code === 'EAUTH') {
                throw new InternalServerErrorException(
                    'Servidor de email bloqueou temporariamente novas autenticações. Tente novamente mais tarde.'
                )
            }
            if (err.code === "ECONNREFUSED") throw new InternalServerErrorException('Erro ao tentar conectar com o servidor de email')
            if (err.code === "INVALID_EMAIL") throw new BadRequestException('O email fornecido é inválido.')
            throw new InternalServerErrorException("Erro ao enviar email promocional")
        }
    }
}
