import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { TestService } from './test.service';

@Controller('test')
export class TestController {

    constructor(private readonly testService: TestService) { }

    @Post()
    @ApiOperation({ summary: 'email test' })
    async sendEmailTeste(@Body('str') str: string) {
        return this.testService.sendEmailTest(str)
    }
    @Get('templates')
    async testingTemplates() {
        return this.testService.testTemplates()
    }
}
