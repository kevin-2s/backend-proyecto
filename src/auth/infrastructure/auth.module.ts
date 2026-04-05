import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsuarioEntity } from '../../users/infrastructure/entities/usuario.typeorm.entity';
import { AuthController } from './adapters/input/http/auth.controller';
import { AuthService } from '../application/services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtTokenProvider } from './adapters/output/providers/jwt-token.provider';
import { BcryptPasswordProvider } from './adapters/output/providers/bcrypt-password.provider';
import { AuthUserRepositoryAdapter } from './adapters/output/persistence/auth-user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioEntity]),
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '15m' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'LoginUseCase',
      useFactory: (authRepo, passHash, tokenProv) =>
        new AuthService(authRepo, passHash, tokenProv),
      inject: ['AuthRepositoryPort', 'PasswordHashPort', 'TokenProviderPort'],
    },
    {
      provide: 'AuthRepositoryPort',
      useClass: AuthUserRepositoryAdapter,
    },
    {
      provide: 'PasswordHashPort',
      useClass: BcryptPasswordProvider,
    },
    {
      provide: 'TokenProviderPort',
      useClass: JwtTokenProvider,
    },
    JwtStrategy,
  ],
  exports: [JwtModule, 'TokenProviderPort'],
})
export class AuthModule {}