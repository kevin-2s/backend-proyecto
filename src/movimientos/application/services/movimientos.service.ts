import { Injectable, Inject } from '@nestjs/common';
import { IMovimientosUseCases } from '../../domain/ports/input/movimientos-use-cases.interface';
import { IMovimientosRepository, MOVIMIENTOS_REPOSITORY } from '../../domain/ports/output/movimientos-repository.interface';
import { Movimiento } from '../../domain/entities/movimiento.domain.entity';
import { MovimientoNotFoundException } from '../../domain/exceptions/movimiento-not-found.exception';
import { IKardexRepository, KARDEX_REPOSITORY } from '../../../kardex/domain/ports/output/kardex-repository.interface';
import { TipoKardex } from '../../../kardex/domain/entities/kardex.domain.entity';
import { ITiposMovimientoRepository, TIPOS_MOVIMIENTO_REPOSITORY } from '../../../tipos-movimiento/domain/ports/output/tipos-movimiento-repository.interface';
import { TipoMovimiento as EnumTipoMovimiento } from '../../../shared/domain/enums';

@Injectable()
export class MovimientosService implements IMovimientosUseCases {
  constructor(
    @Inject(MOVIMIENTOS_REPOSITORY)
    private readonly movimientosRepository: IMovimientosRepository,
    @Inject(KARDEX_REPOSITORY)
    private readonly kardexRepository: IKardexRepository,
    @Inject(TIPOS_MOVIMIENTO_REPOSITORY)
    private readonly tiposMovimientoRepository: ITiposMovimientoRepository,
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

  async crearMovimiento(data: { fecha: Date; observacion: string | null; id_item: number; id_tipo_movimiento: number; id_usuario: number; cantidad: number }): Promise<Movimiento> {
    const { cantidad, ...movimientoData } = data;

    // 1. Crear el Movimiento
    const nuevoMovimiento = await this.movimientosRepository.create(movimientoData);

    // 2. Obtener tipo de movimiento
    const tipos = await this.tiposMovimientoRepository.findAll();
    const tipo = tipos.find(t => t.id_tipo_movimiento === data.id_tipo_movimiento);
    if (!tipo) throw new Error('Tipo de movimiento no válido');

    const isEntrada = tipo.nombre === EnumTipoMovimiento.ENTRADA || tipo.nombre === EnumTipoMovimiento.DEVOLUCION;
    const isSalida = tipo.nombre === EnumTipoMovimiento.SALIDA || tipo.nombre === EnumTipoMovimiento.PRESTAMO;

    // 3. Obtener el historial para setear el saldo_anterior
    const historialKardex = await this.kardexRepository.findByItemId(data.id_item);
    const ultimoKardex = historialKardex.length > 0 ? historialKardex[historialKardex.length - 1] : null;
    const saldo_anterior = ultimoKardex ? ultimoKardex.saldo_actual : 0;

    let saldo_actual = saldo_anterior;
    let tipoKardex = TipoKardex.SALIDA;
    
    if (isEntrada) {
      saldo_actual = saldo_anterior + cantidad;
      tipoKardex = TipoKardex.ENTRADA;
    } else if (isSalida) {
      saldo_actual = saldo_anterior - cantidad;
      tipoKardex = TipoKardex.SALIDA;
    }

    // 4. Registrar en Kardex
    await this.kardexRepository.create({
      tipo: tipoKardex,
      cantidad,
      saldo_anterior,
      saldo_actual,
      fecha: new Date(),
      observacion: data.observacion,
      id_item: data.id_item,
      id_usuario: data.id_usuario,
    });

    return nuevoMovimiento;
  }
}
