import { TokenProviderPort } from '../../../domain/ports/output/auth.repository.port';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtTokenProvider implements TokenProviderPort {
    constructor(private readonly jwtService: JwtService) {}

    generateAccessToken(payload: any): string {
        return this.jwtService.sign(payload, { expiresIn: '15m' });
    }

    generateRefreshToken(payload: any): string {
        return this.jwtService.sign(payload, { expiresIn: '7d' });
    }
}
