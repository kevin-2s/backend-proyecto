import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(Error)
export class DomainExceptionFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        // HttpException (incluyendo BadRequestException del ValidationPipe)
        // → devolver su respuesta original con los mensajes de validación reales
        if (exception instanceof HttpException) {
            const status = exception.getStatus();
            const body = exception.getResponse();
            response.status(status).json(body);
            return;
        }

        // Excepciones de dominio personalizadas
        let status = HttpStatus.INTERNAL_SERVER_ERROR;

        if (exception.name.includes('NotFoundException')) {
            status = HttpStatus.NOT_FOUND;
        } else if (exception.name.includes('ForbiddenException')) {
            status = HttpStatus.FORBIDDEN;
        } else if (exception.name.includes('InvalidCredentialsException') || exception.name.includes('UnauthorizedException')) {
            status = HttpStatus.UNAUTHORIZED;
        } else if (exception.name.includes('Exception')) {
            status = HttpStatus.BAD_REQUEST;
        }

        response.status(status).json({
            statusCode: status,
            message: exception.message,
            error: exception.name,
        });
    }
}
