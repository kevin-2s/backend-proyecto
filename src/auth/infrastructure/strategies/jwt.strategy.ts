import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'sgm_jwt_secret_dev_key',
        });
    }

    async validate(payload: any) {
        // Retorna la data validada que estará disponible en request.user
        return { userId: payload.sub, roles: payload.roles };
    }
}
