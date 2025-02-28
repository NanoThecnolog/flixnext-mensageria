import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compareSync } from 'bcryptjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
    constructor(private configService: ConfigService) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const apiKey = request.headers['key'];

        if (!apiKey) {
            throw new UnauthorizedException('API Key não fornecida');
        }

        const apiKeyHash = this.configService.get<string>('API_KEY_HASH')
        if (!apiKeyHash) throw new Error("Variável de ambiente hash não definido")
        if (!compareSync(apiKey, apiKeyHash)) {
            throw new UnauthorizedException('API Key inválida');
        }
        return true;
    }
}
