import { Injectable, Inject } from '@nestjs/common';
import { IMovimientosUseCases } from '../../domain/ports/input/movimientos-use-cases.interface';
import { IMovimientosRepository, MOVIMIENTOS_REPOSITORY } from '../../domain/ports/output/movimientos-repository.interface';
import { Movimiento } from '../../domain/entities/movimiento.domain.entity';
import { MovimientoNotFoundException } from '../../domain/exceptions/movimiento-not-found.exception';

@Injectable()
export class MovimientosService implements IMovimientosUseCases {
  constructor(
    @Inject(MOVIMIENTOS_REPOSITORY)
    private readonly movimientosRepository: IMovimientosRepository,
  ) {}

  async obtenerMovimientos(): Promise<Movimiento[]> {
    return this.movimientosRepository.findAll();
  }

  async obtenerMovimientoPorId(id: number): Promise<Movimiento> {
    const movimiento = await this.movimientosRepository.findById(id);
    if (!movimiento) {
      throw new MovimientoNotFoundException(id);
    }
    return movimiento;
  }

  async crearMovimiento(data: { fecha: Date; observacion: string | null; id_item: number; id_tipo_movimiento: number; id_usuario: number }): Promise<Movimiento> {
    return this.movimientosRepository.create(data);
  }
}
