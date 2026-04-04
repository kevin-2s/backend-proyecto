import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './adapters/input/http/auth.controller';
import { AuthService } from '../application/services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtTokenProvider } from './adapters/output/providers/jwt-token.provider';
import { BcryptPasswordProvider } from './adapters/output/providers/bcrypt-password.provider';
import { AuthUserRepositoryAdapter } from './adapters/output/persistence/auth-user.repository';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'sgm_jwt_secret_dev_key',
        }),
    ],
    controllers: [AuthController],
    providers: [
        {
            provide: 'LoginUseCase',
            useFactory: (authRepo, passHash, tokenProv) => new AuthService(authRepo, passHash, tokenProv),
            inject: ['AuthRepositoryPort', 'PasswordHashPort', 'TokenProviderPort']
        },
        {
            provide: 'AuthRepositoryPort',
            useClass: AuthUserRepositoryAdapter
        },
        {
            provide: 'PasswordHashPort',
            useClass: BcryptPasswordProvider
        },
        {
            provide: 'TokenProviderPort',
            useClass: JwtTokenProvider
        },
        JwtStrategy
    ],
    exports: [JwtModule, 'TokenProviderPort']
})
export class AuthModule {}
