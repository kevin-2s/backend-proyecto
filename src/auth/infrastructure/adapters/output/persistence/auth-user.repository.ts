import { AuthRepositoryPort } from '../../../../domain/ports/output/auth.repository.port';
import { AuthUser } from '../../../../domain/entities/auth-user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthUserRepositoryAdapter implements AuthRepositoryPort {
    async findUserByEmail(email: string): Promise<AuthUser | null> {
        // En un futuro próximo se inyectará UserRepository o TypeORM para consultar el usuario real.
        // Mock de prueba para compilar la base.
        if (email === 'admin@sena.edu.co') {
            return new AuthUser('1', email, '$2b$10$w...HashedPasswordReal...', ['Administrador']);
        }
        return null;
    }
}
