import { Role } from '../../entities/role.entity';

export interface PaginatedResult<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
}

export interface RoleRepositoryPort {
    findAll(page: number, limit: number): Promise<PaginatedResult<Role>>;
    findById(id: string): Promise<Role | null>;
    save(role: Role): Promise<Role>;
}
