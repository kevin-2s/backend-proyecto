import { Injectable, Inject } from '@nestjs/common';
import { IInventarioUseCases } from '../../domain/ports/input/inventario-use-cases.interface';
import { IInventarioRepository, INVENTARIO_REPOSITORY } from '../../domain/ports/output/inventario-repository.interface';
import { Inventario } from '../../domain/entities/inventario.domain.entity';
import { InventarioNotFoundException } from '../../domain/exceptions/inventario-not-found.exception';
import { EstadoItem } from '../../../items/domain/entities/item.domain.entity';

@Injectable()
export class InventarioService implements IInventarioUseCases {
  constructor(
    @Inject(INVENTARIO_REPOSITORY)
    private readonly inventarioRepository: IInventarioRepository,
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
    return this.inventarioRepository.create(data);
  }
}
