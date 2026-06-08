import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { OrdenesCompraUseCasesInterface } from '../../domain/ports/input/ordenes-compra-use-cases.interface';
import { OrdenesCompraRepositoryInterface } from '../../domain/ports/output/ordenes-compra-repository.interface';
import { CreateOrdenCompraDto } from '../../infrastructure/adapters/input/http/dtos/create-orden-compra.dto';
import { UpdateOrdenCompraDto } from '../../infrastructure/adapters/input/http/dtos/update-orden-compra.dto';
import { OrdenCompraDomainEntity } from '../../domain/entities/orden-compra.domain.entity';

@Injectable()
export class OrdenesCompraService implements OrdenesCompraUseCasesInterface {
  constructor(
    @Inject('OrdenesCompraRepositoryInterface')
    private readonly ordenesCompraRepository: OrdenesCompraRepositoryInterface,
  ) {}

  async createOrdenCompra(dto: CreateOrdenCompraDto): Promise<OrdenCompraDomainEntity> {
    const orden = new OrdenCompraDomainEntity();
    orden.id_proveedor = dto.id_proveedor;
    orden.id_item = dto.id_item;
    orden.cantidad = dto.cantidad;
    orden.precio_unitario = dto.precio_unitario;
    orden.precio_total = dto.cantidad * dto.precio_unitario;
    orden.observacion = dto.observacion;
    orden.estado = 'PENDIENTE';

    return await this.ordenesCompraRepository.create(orden);
  }

  async getOrdenesCompra(): Promise<OrdenCompraDomainEntity[]> {
    return await this.ordenesCompraRepository.findAll();
  }

  async getOrdenCompraById(id: number): Promise<OrdenCompraDomainEntity> {
    const orden = await this.ordenesCompraRepository.findById(id);
    if (!orden) {
      throw new NotFoundException(`Orden de compra con ID ${id} no encontrada`);
    }
    return orden;
  }

  async updateOrdenCompra(id: number, dto: UpdateOrdenCompraDto): Promise<OrdenCompraDomainEntity> {
    const ordenExists = await this.getOrdenCompraById(id);
    
    // Convert DTO to Partial Domain Entity manually
    const partialUpdate: Partial<OrdenCompraDomainEntity> = {
      ...dto
    };
    
    if (dto.cantidad !== undefined || dto.precio_unitario !== undefined) {
        const newCantidad = dto.cantidad !== undefined ? dto.cantidad : ordenExists.cantidad;
        const newPrecioUnitario = dto.precio_unitario !== undefined ? dto.precio_unitario : ordenExists.precio_unitario;
        partialUpdate.precio_total = newCantidad * newPrecioUnitario;
    }
    
    const updated = await this.ordenesCompraRepository.update(id, partialUpdate);
    if (!updated) {
      throw new NotFoundException(`Orden de compra con ID ${id} no se pudo actualizar`);
    }
    return updated;
  }

  async deleteOrdenCompra(id: number): Promise<void> {
    const ordenExists = await this.getOrdenCompraById(id);
    const deleted = await this.ordenesCompraRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`No se pudo eliminar la orden de compra con ID ${id}`);
    }
  }
}
