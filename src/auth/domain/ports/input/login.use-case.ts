import { AuthToken } from '../../entities/auth-token.entity';

export interface LoginUseCase {
    execute(email: string, password: string): Promise<AuthToken>;
}
