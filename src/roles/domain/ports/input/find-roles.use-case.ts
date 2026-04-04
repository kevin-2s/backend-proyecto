import { Role } from '../../entities/role.entity';
import { PaginatedResult } from '../output/role.repository.port';

export interface FindRolesUseCase {
    findAll(page: number, limit: number): Promise<PaginatedResult<Role>>;
    findById(id: string): Promise<Role>;
}
