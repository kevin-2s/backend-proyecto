import { Role } from '../../domain/entities/role.entity';
import { FindRolesUseCase } from '../../domain/ports/input/find-roles.use-case';
import { CreateRoleUseCase, CreateRoleCommand } from '../../domain/ports/input/create-role.use-case';
import { RoleRepositoryPort, PaginatedResult } from '../../domain/ports/output/role.repository.port';
import { RoleNotFoundException } from '../../domain/exceptions/role-not-found.exception';

export class RolesService implements FindRolesUseCase, CreateRoleUseCase {
    constructor(private readonly roleRepository: RoleRepositoryPort) {}

    async findAll(page: number, limit: number): Promise<PaginatedResult<Role>> {
        return this.roleRepository.findAll(page, limit);
    }

    async findById(id: string): Promise<Role> {
        const role = await this.roleRepository.findById(id);
        if (!role) {
            throw new RoleNotFoundException(id);
        }
        return role;
    }

    async create(command: CreateRoleCommand): Promise<Role> {
        const newRole = new Role('', command.name, command.description, new Date(), new Date());
        return this.roleRepository.save(newRole);
    }
}
