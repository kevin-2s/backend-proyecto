import { Injectable, Inject } from '@nestjs/common';
import { ITiposMovimientoUseCases } from '../../domain/ports/input/tipos-movimiento-use-cases.interface';
import { ITiposMovimientoRepository, TIPOS_MOVIMIENTO_REPOSITORY } from '../../domain/ports/output/tipos-movimiento-repository.interface';
import { TipoMovimiento } from '../../domain/entities/tipo-movimiento.domain.entity';

@Injectable()
export class TiposMovimientoService implements ITiposMovimientoUseCases {
  constructor(
    @Inject(TIPOS_MOVIMIENTO_REPOSITORY)
    private readonly tiposMovimientoRepository: ITiposMovimientoRepository,
  ) {}

  async obtenerTiposMovimiento(): Promise<TipoMovimiento[]> {
    return this.tiposMovimientoRepository.findAll();
  }

  async crearTipoMovimiento(nombre: string): Promise<TipoMovimiento> {
    return this.tiposMovimientoRepository.create({ nombre });
  }
}
