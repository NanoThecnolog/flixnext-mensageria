import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv'
import { Injectable, OnModuleDestroy } from '@nestjs/common';

dotenv.config()

@Injectable()
export class MailService implements OnModuleDestroy {
    private transporter: nodemailer.Transporter

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: Number(process.env.SMTP_PORT) === 465,

            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },

            pool: true,
            maxConnections: 2,
            maxMessages: 50,

            connectionTimeout: 10_000,
            greetingTimeout: 10_000,
            socketTimeout: 20_000
        })
    }

    async sendMail(to: string, subject: string, html?: string, text?: string, attachments?: any[]) {
        return this.transporter.sendMail({
            from: `'FlixNext'<${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html,
            attachments
        })
    }

    async onModuleDestroy() {
        if ((this.transporter as any).close) {
            await (this.transporter as any).close()
        }
    }
}