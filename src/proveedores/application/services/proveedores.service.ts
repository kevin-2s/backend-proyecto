import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ProveedoresUseCasesInterface } from '../../domain/ports/input/proveedores-use-cases.interface';
import { ProveedoresRepositoryInterface } from '../../domain/ports/output/proveedores-repository.interface';
import { CreateProveedorDto } from '../../infrastructure/adapters/input/http/dtos/create-proveedor.dto';
import { UpdateProveedorDto } from '../../infrastructure/adapters/input/http/dtos/update-proveedor.dto';
import { ProveedorDomainEntity } from '../../domain/entities/proveedor.domain.entity';

@Injectable()
export class ProveedoresService implements ProveedoresUseCasesInterface {
  constructor(
    @Inject('ProveedoresRepositoryInterface')
    private readonly proveedoresRepository: ProveedoresRepositoryInterface,
  ) {}

  async createProveedor(dto: CreateProveedorDto): Promise<ProveedorDomainEntity> {
    const proveedor = new ProveedorDomainEntity();
    proveedor.nombre_empresa = dto.nombre_empresa;
    proveedor.nit = dto.nit;
    proveedor.contacto = dto.contacto;
    proveedor.telefono = dto.telefono;
    proveedor.correo = dto.correo;
    proveedor.direccion = dto.direccion;
    proveedor.estado = dto.estado !== undefined ? dto.estado : true;

    return await this.proveedoresRepository.create(proveedor);
  }

  async getProveedores(): Promise<ProveedorDomainEntity[]> {
    return await this.proveedoresRepository.findAll();
  }

  async getProveedorById(id: number): Promise<ProveedorDomainEntity> {
    const proveedor = await this.proveedoresRepository.findById(id);
    if (!proveedor) {
      throw new NotFoundException(`Proveedor con ID ${id} no encontrado`);
    }
    return proveedor;
  }

  async updateProveedor(id: number, dto: UpdateProveedorDto): Promise<ProveedorDomainEntity> {
    const proveedorExists = await this.getProveedorById(id);
    
    // Convert DTO to Partial Domain Entity manually
    const partialUpdate: Partial<ProveedorDomainEntity> = {
      ...dto
    };
    
    const updated = await this.proveedoresRepository.update(id, partialUpdate);
    if (!updated) {
      throw new NotFoundException(`Proveedor con ID ${id} no se pudo actualizar`);
    }
    return updated;
  }

  async deleteProveedor(id: number): Promise<void> {
    const proveedorExists = await this.getProveedorById(id);
    const deleted = await this.proveedoresRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`No se pudo eliminar el proveedor con ID ${id}`);
    }
  }
}
