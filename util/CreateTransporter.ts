import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv'
import { Injectable } from '@nestjs/common';

dotenv.config()

@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
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
}