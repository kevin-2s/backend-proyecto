import { AuthToken } from '../../entities/auth-token.entity';

export interface LoginUseCase {
    execute(correo: string, contrasena: string): Promise<AuthToken>;
}
