import { Usuario } from '../../domain/entities/usuario.entity';
import { FindUsuarioUseCase } from '../../domain/ports/input/find-usuario.use-case';
import { CreateUsuarioUseCase, CreateUsuarioCommand } from '../../domain/ports/input/create-usuario.use-case';
import { UsuarioRepositoryPort, PaginatedResult } from '../../domain/ports/output/usuario.repository.port';
import { UsuarioNotFoundException } from '../../domain/exceptions/usuario-not-found.exception';

export class UsuarioService implements FindUsuarioUseCase, CreateUsuarioUseCase {
    constructor(private readonly repository: UsuarioRepositoryPort) {}

    async findAll(page: number, limit: number): Promise<PaginatedResult<Usuario>> {
        return this.repository.findAll(page, limit);
    }

    async findById(id: string): Promise<Usuario> {
        const entity = await this.repository.findById(id);
        if (!entity) throw new UsuarioNotFoundException(id);
        return entity;
    }

    async create(command: CreateUsuarioCommand): Promise<Usuario> {
        const newEntity = new Usuario(0, command.nombreCompleto, command.correo, command.contrasena, command.estado ?? true, command.rolId);
        return this.repository.save(newEntity);
    }
}
