import { AuthToken } from '../../entities/auth-token.entity';

export interface RefreshUseCase {
    execute(refreshToken: string): Promise<AuthToken>;
}
