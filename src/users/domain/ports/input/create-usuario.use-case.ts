import { Usuario } from '../../entities/usuario.entity';

export interface CreateUsuarioCommand {
    nombreCompleto: string;
    correo: string;
    contrasena: string;
    estado?: boolean;
    rolId: number;
}

export interface CreateUsuarioUseCase {
    create(command: CreateUsuarioCommand): Promise<Usuario>;
}
