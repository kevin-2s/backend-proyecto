import { Usuario } from '../../entities/usuario.entity';

export interface CreateUsuarioCommand {
    email: string;
    passwordHash: string;
    nombres: string;
    apellidos: string;
    rolId: string;
}

export interface CreateUsuarioUseCase {
    create(command: CreateUsuarioCommand): Promise<Usuario>;
}
