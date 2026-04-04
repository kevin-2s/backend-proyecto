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

    async execute(email: string, password: string): Promise<AuthToken> {
        const user = await this.authRepository.findUserByEmail(email);
        if (!user) {
            throw new InvalidCredentialsException();
        }

        const isPasswordValid = await this.passwordHash.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            throw new InvalidCredentialsException();
        }

        const payload = { sub: user.id, roles: user.roles };
        const accessToken = this.tokenProvider.generateAccessToken(payload);
        const refreshToken = this.tokenProvider.generateRefreshToken(payload);

        return new AuthToken(accessToken, refreshToken, 900); // 15 min en segundos
    }
}
