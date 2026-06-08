import { PrestamoDomainEntity } from '../../entities/prestamo.domain.entity';

export interface PrestamosRepositoryInterface {
  create(prestamo: PrestamoDomainEntity): Promise<PrestamoDomainEntity>;
  findAll(): Promise<PrestamoDomainEntity[]>;
  findActivos(): Promise<PrestamoDomainEntity[]>;
  findById(id: number): Promise<PrestamoDomainEntity | null>;
  update(id: number, prestamo: Partial<PrestamoDomainEntity>): Promise<PrestamoDomainEntity | null>;
}
