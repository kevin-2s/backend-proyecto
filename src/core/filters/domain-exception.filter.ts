import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch(Error)
export class DomainExceptionFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        
        if (exception.name.includes('NotFoundException')) {
            status = HttpStatus.NOT_FOUND;
        } else if (exception.name.includes('InvalidCredentialsException')) {
            status = HttpStatus.UNAUTHORIZED;
        } else if (exception.name.includes('Exception')) {
            status = HttpStatus.BAD_REQUEST; 
        }

        response.status(status).json({
            statusCode: status,
            message: exception.message,
            error: exception.name
        });
    }
}
