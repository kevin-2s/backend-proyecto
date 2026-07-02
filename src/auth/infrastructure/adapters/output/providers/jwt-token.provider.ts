import { TokenProviderPort } from '../../../../domain/ports/output/auth.repository.port';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtTokenProvider implements TokenProviderPort {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    generateAccessToken(payload: any): string {
        return this.jwtService.sign(payload, { expiresIn: '5m' });
    }

    generateRefreshToken(payload: any): string {
        return this.jwtService.sign(payload, {
            expiresIn: '7d',
            secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        });
    }

    verifyRefreshToken(token: string): { sub: string; roles: string[]; tenantId?: string } {
        try {
            return this.jwtService.verify(token, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            });
        } catch {
            throw new UnauthorizedException('Token de actualización inválido o expirado');
        }
    }
}
