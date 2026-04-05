import { Role } from '../../entities/role.entity';

export interface CreateRoleCommand {
    nombreRol: string;
}

export interface CreateRoleUseCase {
    create(command: CreateRoleCommand): Promise<Role>;
}
