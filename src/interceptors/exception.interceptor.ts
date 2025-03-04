import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpException, InternalServerErrorException, BadRequestException, HttpStatus, UnauthorizedException, NotFoundException, ConflictException, ServiceUnavailableException } from '@nestjs/common';
import { catchError, Observable, throwError, map } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                const statusCode = context.switchToHttp().getResponse().statusCode
                return {
                    code: statusCode,
                    message: 'Requisição bem sucedida!',
                    data: data
                }
            }),
            catchError((err) => {
                if (err instanceof BadRequestException) {
                    throw new BadRequestException('Requisição mal feita!', `${err.message}`)
                } else if (err instanceof TypeError) {
                    throw new BadRequestException('parâmetro obrigatório não enviado.', `${err.message}`)
                } else if (err instanceof InternalServerErrorException) {
                    throw new InternalServerErrorException('Erro interno do servidor.', `${err.message}`)
                } else if (err instanceof UnauthorizedException) {
                    throw new UnauthorizedException('Credenciais invalidas', `${err.message}`)
                } else if (err instanceof NotFoundException) {
                    throw new NotFoundException('Campo não encontrado no banco de dados', `${err.message}`)
                } else if (err instanceof ConflictException) {
                    throw new ConflictException('Dado único fornecido já está em uso', `${err.message}`)
                } else if (err instanceof ServiceUnavailableException) {
                    throw new ServiceUnavailableException('Servidor temporariamente indisponível', `${err.message}`)
                } else if (err instanceof HttpException) {
                    throw new HttpException({
                        code: HttpStatus.INTERNAL_SERVER_ERROR,
                        message: 'Erro desconhecido',
                        error: err.message
                    }, HttpStatus.INTERNAL_SERVER_ERROR)
                }

                console.error('Erro desconhecido:', err);

                return throwError(
                    () => new InternalServerErrorException('Erro interno do servidor!'),
                );
            }),
        );
    }
}
