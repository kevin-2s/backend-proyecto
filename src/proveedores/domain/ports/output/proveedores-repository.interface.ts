import { ProveedorDomainEntity } from '../../entities/proveedor.domain.entity';

export interface ProveedoresRepositoryInterface {
  create(proveedor: ProveedorDomainEntity): Promise<ProveedorDomainEntity>;
  findAll(): Promise<ProveedorDomainEntity[]>;
  findById(id: number): Promise<ProveedorDomainEntity | null>;
  update(id: number, proveedor: Partial<ProveedorDomainEntity>): Promise<ProveedorDomainEntity | null>;
  delete(id: number): Promise<boolean>;
}
