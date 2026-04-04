import { Controller, Post, Body, Inject, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dtos/login.dto';
import { LoginUseCase } from '../../../../domain/ports/input/login.use-case';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        @Inject('LoginUseCase') private readonly loginUseCase: LoginUseCase
    ) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Iniciar sesión en el sistema' })
    @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso, devuelve los tokens JWT' })
    @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
    async login(@Body() loginDto: LoginDto) {
        const result = await this.loginUseCase.execute(loginDto.email, loginDto.password);
        return {
            statusCode: HttpStatus.OK,
            message: 'Login exitoso',
            data: result
        };
    }
}
