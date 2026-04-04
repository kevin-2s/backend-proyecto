import { Role } from '../../entities/role.entity';

export interface CreateRoleCommand {
    name: string;
    description: string;
}

export interface CreateRoleUseCase {
    create(command: CreateRoleCommand): Promise<Role>;
}
