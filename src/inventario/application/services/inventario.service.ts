import { Injectable, Inject } from '@nestjs/common';
import { IInventarioUseCases } from '../../domain/ports/input/inventario-use-cases.interface';
import { IInventarioRepository, INVENTARIO_REPOSITORY } from '../../domain/ports/output/inventario-repository.interface';
import { Inventario } from '../../domain/entities/inventario.domain.entity';
import { InventarioNotFoundException } from '../../domain/exceptions/inventario-not-found.exception';
import { EstadoItem } from '../../../items/domain/entities/item.domain.entity';
import { IKardexRepository, KARDEX_REPOSITORY } from '../../../kardex/domain/ports/output/kardex-repository.interface';
import { TipoKardex } from '../../../kardex/domain/entities/kardex.domain.entity';

@Injectable()
export class InventarioService implements IInventarioUseCases {
  constructor(
    @Inject(INVENTARIO_REPOSITORY)
    private readonly inventarioRepository: IInventarioRepository,
    @Inject(KARDEX_REPOSITORY)
    private readonly kardexRepository: IKardexRepository,
  ) {}

  async obtenerInventarios(): Promise<Inventario[]> {
    return this.inventarioRepository.findAll();
  }

  async obtenerInventarioPorId(id: number): Promise<Inventario> {
    const inventario = await this.inventarioRepository.findById(id);
    if (!inventario) {
      throw new InventarioNotFoundException(id);
    }
    return inventario;
  }

  async crearInventario(data: { estado: EstadoItem; id_item: number; id_sitio: number }): Promise<Inventario> {
    const inv = await this.inventarioRepository.create(data);
    
    // Log initial inventory entry in Kardex
    await this.kardexRepository.create({
      tipo: TipoKardex.ENTRADA,
      cantidad: 1,
      saldo_anterior: 0,
      saldo_actual: 1,
      fecha: new Date(),
      observacion: `Ingreso inicial de ítem al inventario. Ubicación ID: ${data.id_sitio}`,
      id_item: data.id_item,
      id_usuario: 1,
    });

    return inv;
  }

  async actualizarInventario(id: number, data: Partial<Inventario>): Promise<Inventario> {
    await this.obtenerInventarioPorId(id);
    return this.inventarioRepository.update(id, data);
  }

  async eliminarInventario(id: number): Promise<void> {
    await this.obtenerInventarioPorId(id);
    await this.inventarioRepository.delete(id);
  }
}
