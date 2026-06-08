import { OrdenCompraDomainEntity } from '../../entities/orden-compra.domain.entity';

export interface OrdenesCompraRepositoryInterface {
  create(orden: OrdenCompraDomainEntity): Promise<OrdenCompraDomainEntity>;
  findAll(): Promise<OrdenCompraDomainEntity[]>;
  findById(id: number): Promise<OrdenCompraDomainEntity | null>;
  update(id: number, orden: Partial<OrdenCompraDomainEntity>): Promise<OrdenCompraDomainEntity | null>;
  delete(id: number): Promise<boolean>;
}
