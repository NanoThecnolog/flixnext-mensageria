import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { NewAccountProps, ProblemTemplateProps, RecoverProps, RequestProps } from '@types';
import { createTransporter } from 'util/CreateTransporter';
import { generateEmailTest, generateNewAccNotificationContent, generateProblemTemplate, generatePromotionalTemplate, generateRecoverTemplate, generateRequestTemplate } from 'util/GenerateEmailTemplates';
import { getAllUsers } from 'util/GetDB';



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
      //console.log("primeiro estágio")
      const html = generateEmailTest(str)
      //console.log("segundo estágio", transporter)
      const sendEmail = await transporter.sendMail({
        from: `'FlixNext'<${process.env.EMAIL_USER}>`,
        to: "ericssongomes.fotografia@gmail.com",
        subject: "Email Teste",
        html: html
      })
      //console.log("terceiro estágio")
      return sendEmail
    } catch (err) {
      throw new Error(`Erro ao enviar email teste: ${err}`)
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
      throw new Error("Erro ao enviar email de Notificação")
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
      throw new Error("Erro ao enviar email de notificação de problema")
    }
  }

  async sendPromotionalEmail() {
    const users = await getAllUsers()
    const assunto = "Muita Novidade e Diversão para o seu 2025!"

    const pLimit = (await import('p-limit')).default;
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
      throw new Error("Erro ao enviar email promocional")
    }
  }

  async sendRequestEmail(data: RequestProps) {
    const prisma = new PrismaClient()
    const userExiste = await prisma.user.findUnique({
      where: { id: data.userId }
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
      throw new Error("Erro ao enviar email de Solicitação de conteúdo")
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
      throw new Error("Erro ao enviar email de recuperação de senha")
    }
  }
}