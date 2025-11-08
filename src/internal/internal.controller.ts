import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { NewUserDTO } from 'src/dto/email.dto';
import { InternalService } from './internal.service';

@Controller('internal')
export class InternalController {
    constructor(private readonly internalService: InternalService) { }


    //Notificação de usuário novo
    @Post('new/user')
    @ApiOperation({ summary: 'Notificação para o sistema de novo usuário' })
    async sendNewAccountNotification(@Body() user: NewUserDTO) {
        return this.internalService.sendNewAccountNotification(user)
    }
}
