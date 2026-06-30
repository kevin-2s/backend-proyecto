import { AuthToken } from '../../domain/entities/auth-token.entity';
import { TokenProviderPort } from '../../domain/ports/output/auth.repository.port';
import { RefreshUseCase } from '../../domain/ports/input/refresh.use-case';

export class RefreshService implements RefreshUseCase {
    constructor(private readonly tokenProvider: TokenProviderPort) {}

    async execute(refreshToken: string): Promise<AuthToken> {
        const payload = this.tokenProvider.verifyRefreshToken(refreshToken);
        const newPayload = { sub: payload.sub, roles: payload.roles };
        const accessToken = this.tokenProvider.generateAccessToken(newPayload);
        const newRefreshToken = this.tokenProvider.generateRefreshToken(newPayload);
        return new AuthToken(accessToken, newRefreshToken, 300);
    }
}
