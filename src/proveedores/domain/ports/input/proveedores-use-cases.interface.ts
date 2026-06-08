import { ProveedorDomainEntity } from '../../entities/proveedor.domain.entity';
import { CreateProveedorDto } from '../../../infrastructure/adapters/input/http/dtos/create-proveedor.dto';
import { UpdateProveedorDto } from '../../../infrastructure/adapters/input/http/dtos/update-proveedor.dto';

export interface ProveedoresUseCasesInterface {
  createProveedor(dto: CreateProveedorDto): Promise<ProveedorDomainEntity>;
  getProveedores(): Promise<ProveedorDomainEntity[]>;
  getProveedorById(id: number): Promise<ProveedorDomainEntity>;
  updateProveedor(id: number, dto: UpdateProveedorDto): Promise<ProveedorDomainEntity>;
  deleteProveedor(id: number): Promise<void>;
}
