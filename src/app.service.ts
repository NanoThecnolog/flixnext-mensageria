import { BadRequestException, Injectable, InternalServerErrorException, OnApplicationBootstrap } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ActivatedAccProps, NewAccountProps, NewAccountUserProps, ProblemTemplateProps, RecoverProps, RequestProps } from '@types';
import { createTransporter } from 'util/CreateTransporter';
import { generateActivatedConfirmation, generateEmailInfo, generateEmailTest, generateNewAccNotificationContent, generateNewAccUserNotify, generateProblemTemplate, generatePromotionalTemplate, generateRecoverTemplate, generateRequestTemplate } from 'util/GenerateEmailTemplates';
import { getAllUsers } from 'util/GetDB';
import axios from 'axios'



const transporter = createTransporter();

@Injectable()
export class AppService {

  getActive() {
    return {
      code: 200,
      status: "Ativo",
      message: 'Mensageria rodando!'
    };
  }
  async sendEmailTest(str: string) {
    try {
      const html = generateEmailTest(str)
      const sendEmail = await transporter.sendMail({
        from: `'FlixNext'<${process.env.EMAIL_USER}>`,
        to: "ericssongomes.fotografia@gmail.com",
        subject: "Email Teste",
        html: html
      })
      return sendEmail
    } catch (err) {
      if (err.code === "ECONNREFUSED") throw new InternalServerErrorException('Erro ao tentar conectar com o servidor de email')
      if (err.code === "INVALID_EMAIL") throw new BadRequestException('O email fornecido é inválido.')

      throw new BadRequestException('Erro ao enviar email teste')
    }
  }

  async sendNewAccountUserNotification(data: NewAccountUserProps) {
    if (!data) throw new BadRequestException("Informações não enviadas.")
    try {
      const html = generateNewAccUserNotify(data.name, data.activateLink, data.qrCode)
      const sendEmail = await transporter.sendMail({
        from: `'FlixNext'<${process.env.EMAIL_USER}>`,
        to: data.email,
        subject: "Incrível! Sua conta na FlixNext foi criada!",
        text: `Olá, ${data.name}! Obrigado por criar uma conta na plataforma FlixNext! Por favor, clique no link para ativar sua conta: ${data.activateLink}. Esse é um email automático. Por favor, não responda.`,
        html
      })
      return sendEmail
    } catch (err) {
      if (err.code === "ECONNREFUSED") throw new InternalServerErrorException('Erro ao tentar conectar com o servidor de email')
      if (err.code === "INVALID_EMAIL") throw new BadRequestException('O email fornecido é inválido.')
      console.log(err)
      throw new InternalServerErrorException("Erro ao enviar email de nova conta para o usuário.")
    }
  }


  async sendNewAccountNotification({ name, email, birthday, password }: NewAccountProps) {

    try {
      const html = generateNewAccNotificationContent({ name, email, birthday, password })
      const sendEmail = await transporter.sendMail({
        from: `'FlixNext'<${process.env.EMAIL_USER}>`,
        to: "ericssongomes.fotografia@gmail.com",
        subject: "Um Novo usuário foi cadastrado na plataforma!",
        html: html
      })
      return sendEmail
    } catch (err) {
      if (err.code === "ECONNREFUSED") throw new InternalServerErrorException('Erro ao tentar conectar com o servidor de email')
      if (err.code === "INVALID_EMAIL") throw new BadRequestException('O email fornecido é inválido.')

      throw new InternalServerErrorException("Erro ao enviar email de Notificação")
    }
  }

  async sendActivateConfirmation(data: ActivatedAccProps) {
    try {
      const html = generateActivatedConfirmation(data)
      const sendEmail = await transporter.sendMail({
        from: `'FlixNext'<${process.env.EMAIL_USER}>`,
        to: data.email,
        subject: "Conta Ativada com Sucesso!",
        html: html
      })
      return sendEmail
    } catch (err) {
      if (err.code === "ECONNREFUSED") throw new InternalServerErrorException('Erro ao tentar conectar com o servidor de email')
      if (err.code === "INVALID_EMAIL") throw new BadRequestException('O email fornecido é inválido.')
      throw new InternalServerErrorException("Erro ao enviar email de confimação de ativação")
    }
  }

  async sendProblemNotification(data: ProblemTemplateProps) {
    try {
      const html = generateProblemTemplate(data)
      const sendEmail = await transporter.sendMail({
        from: `'FlixNext'<${process.env.EMAIL_USER}>`,
        to: "ericssongomes.fotografia@gmail.com",
        subject: "Notificação de problema com arquivo",
        html
      })
      return sendEmail
    } catch (err) {
      if (err.code === "ECONNREFUSED") throw new InternalServerErrorException('Erro ao tentar conectar com o servidor de email')
      if (err.code === "INVALID_EMAIL") throw new BadRequestException('O email fornecido é inválido.')
      throw new InternalServerErrorException("Erro ao enviar email de notificação de problema")
    }
  }

  async sendInfoEmail() {
    const users = await getAllUsers()
    const assunto = "Informativo FlixNext"
    const { default: pLimit } = await import('p-limit');
    const limit = pLimit(5)

    try {
      const emailPromises = users.map(async (user) => {
        limit(async () => {
          try {
            if (user.news) {
              const html = generateEmailInfo(user.name)
              const send = await transporter.sendMail({
                from: `'FlixNext'<${process.env.EMAIL_USER}>`,
                to: user.email,
                subject: assunto,
                html
              })
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

  async sendPromotionalEmail() {
    const users = await getAllUsers()
    const assunto = "Muita Novidade e Diversão para o seu 2025!"
    const { default: pLimit } = await import('p-limit');
    const limit = pLimit(5)

    try {
      const emailPromises = users.map(async (user) => {
        limit(async () => {
          try {
            if (user.news) {
              const html = generatePromotionalTemplate(user.name)
              const send = await transporter.sendMail({
                from: `'FlixNext'<${process.env.EMAIL_USER}>`,
                to: user.email,
                subject: assunto,
                html
              })
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
    const prisma = new PrismaClient()
    const userExiste = await prisma.user.findUnique({
      where: { email: data.email }
    })
    if (!userExiste) throw new Error("Usuário não existe!")
    try {
      const html = generateRequestTemplate(data)
      const send = await transporter.sendMail({
        from: `'FlixNext'<${process.env.EMAIL_USER}>`,
        to: 'ericssongomes.fotografia@gmail.com',
        subject: 'Solicitação de Conteúdo',
        html
      })
      return send
    } catch (err) {
      if (err.code === "ECONNREFUSED") throw new InternalServerErrorException('Erro ao tentar conectar com o servidor de email')
      if (err.code === "INVALID_EMAIL") throw new BadRequestException('O email fornecido é inválido.')
      throw new InternalServerErrorException("Erro ao enviar email de Solicitação de conteúdo")
    }
  }

  async sendRecoverEmail(data: RecoverProps) {
    try {
      const html = generateRecoverTemplate(data.userName, data.token)
      const send = await transporter.sendMail({
        from: `"FlixNext" <${process.env.EMAIL_USER}>`,
        to: data.userEmail,
        subject: "Redefinição de Senha - FLIXNEXT",
        html
      })
      return send
    } catch (err) {
      if (err.code === "ECONNREFUSED") throw new InternalServerErrorException('Erro ao tentar conectar com o servidor de email')
      if (err.code === "INVALID_EMAIL") throw new BadRequestException('O email fornecido é inválido.')
      throw new InternalServerErrorException("Erro ao enviar email de recuperação de senha")
    }
  }

}