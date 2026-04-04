import { AuthUser } from '../../entities/auth-user.entity';

export interface AuthRepositoryPort {
    findUserByEmail(email: string): Promise<AuthUser | null>;
}

export interface TokenProviderPort {
    generateAccessToken(payload: any): string;
    generateRefreshToken(payload: any): string;
}

export interface PasswordHashPort {
    compare(plain: string, hashed: string): Promise<boolean>;
}
