import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { RecoverDTO } from 'src/dto/email.dto';
import { RecoverService } from './recover.service';

@Controller('recover')
export class RecoverController {
    constructor(private readonly recoverService: RecoverService) { }


    //Emails de recuperação de conta
    /**Alterar logica para receber o qrcode */
    @Post('user')
    @ApiOperation({ summary: 'Envio de email de recuperação de conta' })
    async sendRecover(@Body() data: RecoverDTO) {
        return this.recoverService.sendRecoverEmail(data)
    }
}
