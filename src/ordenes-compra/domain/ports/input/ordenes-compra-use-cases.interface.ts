import { OrdenCompraDomainEntity } from '../../entities/orden-compra.domain.entity';
import { CreateOrdenCompraDto } from '../../../infrastructure/adapters/input/http/dtos/create-orden-compra.dto';
import { UpdateOrdenCompraDto } from '../../../infrastructure/adapters/input/http/dtos/update-orden-compra.dto';

export interface OrdenesCompraUseCasesInterface {
  createOrdenCompra(dto: CreateOrdenCompraDto): Promise<OrdenCompraDomainEntity>;
  getOrdenesCompra(): Promise<OrdenCompraDomainEntity[]>;
  getOrdenCompraById(id: number): Promise<OrdenCompraDomainEntity>;
  updateOrdenCompra(id: number, dto: UpdateOrdenCompraDto): Promise<OrdenCompraDomainEntity>;
  deleteOrdenCompra(id: number): Promise<void>;
}
