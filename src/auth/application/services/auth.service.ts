import { LoginUseCase } from '../../domain/ports/input/login.use-case';
import { AuthToken } from '../../domain/entities/auth-token.entity';
import { InvalidCredentialsException } from '../../domain/exceptions/auth.exception';
import { AuthRepositoryPort, PasswordHashPort, TokenProviderPort } from '../../domain/ports/output/auth.repository.port';

export class AuthService implements LoginUseCase {
    constructor(
        private readonly authRepository: AuthRepositoryPort,
        private readonly passwordHash: PasswordHashPort,
        private readonly tokenProvider: TokenProviderPort
    ) {}

    async execute(correo: string, contrasena: string): Promise<AuthToken> {
        const user = await this.authRepository.findUserByEmail(correo);
        if (!user) {
            throw new InvalidCredentialsException();
        }

        if (!user.estado) {
            throw new InvalidCredentialsException('Su cuenta ha sido desactivada. Comuníquese con el administrador.');
        }

        if (user.roles.includes('Administrador') && (!user.tenantId || user.tenantId === 'default')) {
            throw new InvalidCredentialsException('Su cuenta no tiene una sede asignada. Comuníquese con el Super Administrador.');
        }

        const isPasswordValid = await this.passwordHash.compare(contrasena, user.passwordHash);
        if (!isPasswordValid) {
            throw new InvalidCredentialsException();
        }

        const payload = { sub: user.id, roles: user.roles, tenantId: user.tenantId };
        const accessToken = this.tokenProvider.generateAccessToken(payload);
        const refreshToken = this.tokenProvider.generateRefreshToken(payload);

        return new AuthToken(accessToken, refreshToken, 300); // 5 min en segundos
    }
}
