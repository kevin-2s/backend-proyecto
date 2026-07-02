import { Controller, Post, Body, Inject, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { LoginDto } from './dtos/login.dto';
import { RefreshDto } from './dtos/refresh.dto';
import { LoginUseCase } from '../../../../domain/ports/input/login.use-case';
import { RefreshUseCase } from '../../../../domain/ports/input/refresh.use-case';
import { Public } from '../../../decorators/public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        @Inject('LoginUseCase') private readonly loginUseCase: LoginUseCase,
        @Inject('RefreshUseCase') private readonly refreshUseCase: RefreshUseCase,
    ) {}

    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @Throttle({
        default: {
            limit: process.env.NODE_ENV === 'production' ? 5 : 1000,
            ttl: 60000,
        },
    })
    @ApiOperation({ summary: 'Iniciar sesión en el sistema' })
    @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso' })
    @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
    @ApiResponse({ status: 429, description: 'Demasiados intentos. Intente de nuevo en 15 minutos' })
    async login(@Body() loginDto: LoginDto) {
        const result = await this.loginUseCase.execute(loginDto.correo, loginDto.contrasena);
        return {
            statusCode: HttpStatus.OK,
            message: 'Login exitoso',
            data: result,
        };
    }

    @Public()
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Renovar el access token usando el refresh token' })
    @ApiResponse({ status: 200, description: 'Tokens renovados exitosamente' })
    @ApiResponse({ status: 401, description: 'Refresh token inválido o expirado' })
    async refresh(@Body() refreshDto: RefreshDto) {
        const result = await this.refreshUseCase.execute(refreshDto.refreshToken);
        return {
            statusCode: HttpStatus.OK,
            message: 'Token renovado exitosamente',
            data: result,
        };
    }
}
