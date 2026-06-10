import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { IPrestamosUseCases } from '../../domain/ports/input/prestamos-use-cases.interface';
import { IPrestamosRepository, PRESTAMOS_REPOSITORY } from '../../domain/ports/output/prestamos-repository.interface';
import { EstadoPrestamo, Prestamo } from '../../domain/entities/prestamo.domain.entity';
import { IItemsRepository, ITEMS_REPOSITORY } from '../../../items/domain/ports/output/items-repository.interface';
import { EstadoItem } from '../../../items/domain/entities/item.domain.entity';
import { IKardexRepository, KARDEX_REPOSITORY } from '../../../kardex/domain/ports/output/kardex-repository.interface';
import { TipoKardex } from '../../../kardex/domain/entities/kardex.domain.entity';

@Injectable()
export class PrestamosService implements IPrestamosUseCases {
  constructor(
    @Inject(PRESTAMOS_REPOSITORY)
    private readonly prestamosRepo: IPrestamosRepository,
    @Inject(ITEMS_REPOSITORY)
    private readonly itemsRepo: IItemsRepository,
    @Inject(KARDEX_REPOSITORY)
    private readonly kardexRepo: IKardexRepository,
  ) {}

  async obtenerTodos(): Promise<Prestamo[]> {
    return this.prestamosRepo.findAll();
  }

  async obtenerActivos(): Promise<Prestamo[]> {
    return this.prestamosRepo.findActivos();
  }

  async obtenerPorId(id: number): Promise<Prestamo | null> {
    return this.prestamosRepo.findById(id);
  }

  async crearPrestamo(data: {
    fecha_devolucion_esperada: Date;
    observacion?: string;
    id_item: number;
    id_usuario_solicitante: number;
    id_usuario_responsable: number;
  }): Promise<Prestamo> {
    // 1. Validar item
    const item = await this.itemsRepo.findById(data.id_item);
    if (!item) {
      throw new NotFoundException(`Ítem con ID ${data.id_item} no encontrado`);
    }
    if (item.estado !== EstadoItem.DISPONIBLE) {
      throw new BadRequestException(`El ítem con ID ${data.id_item} no está disponible (Estado actual: ${item.estado})`);
    }

    // 2. Crear préstamo
    const prestamo = await this.prestamosRepo.create({
      fecha_prestamo: new Date(),
      fecha_devolucion_esperada: data.fecha_devolucion_esperada,
      fecha_devolucion_real: null,
      estado: EstadoPrestamo.ACTIVO,
      observacion: data.observacion ?? null,
      id_item: data.id_item,
      id_usuario_solicitante: data.id_usuario_solicitante,
      id_usuario_responsable: data.id_usuario_responsable,
    });

    // 3. Actualizar estado del ítem a PRESTADO
    await this.itemsRepo.update(data.id_item, { estado: EstadoItem.PRESTADO });

    // 4. Registrar movimiento en Kardex (SALIDA)
    await this.kardexRepo.create({
      tipo: TipoKardex.SALIDA,
      cantidad: 1,
      saldo_anterior: 1,
      saldo_actual: 0,
      fecha: new Date(),
      observacion: `Préstamo registrado. ID Préstamo: ${prestamo.id_prestamo}. ${data.observacion ?? ''}`,
      id_item: data.id_item,
      id_usuario: data.id_usuario_solicitante,
    });

    return prestamo;
  }

  async registrarDevolucion(id: number, observacion?: string): Promise<Prestamo> {
    // 1. Validar préstamo
    const prestamo = await this.prestamosRepo.findById(id);
    if (!prestamo) {
      throw new NotFoundException(`Préstamo con id ${id} no encontrado`);
    }
    if (prestamo.estado !== EstadoPrestamo.ACTIVO) {
      throw new BadRequestException(`El préstamo con id ${id} ya no está activo (Estado: ${prestamo.estado})`);
    }

    // 2. Registrar devolución
    const updated = await this.prestamosRepo.update(id, {
      estado: EstadoPrestamo.DEVUELTO,
      fecha_devolucion_real: new Date(),
      observacion: observacion ?? prestamo.observacion,
    });

    // 3. Actualizar estado del ítem a DISPONIBLE
    await this.itemsRepo.update(prestamo.id_item, { estado: EstadoItem.DISPONIBLE });

    // 4. Registrar movimiento en Kardex (ENTRADA)
    await this.kardexRepo.create({
      tipo: TipoKardex.ENTRADA,
      cantidad: 1,
      saldo_anterior: 0,
      saldo_actual: 1,
      fecha: new Date(),
      observacion: `Devolución de préstamo registrada. ID Préstamo: ${id}. ${observacion ?? ''}`,
      id_item: prestamo.id_item,
      id_usuario: prestamo.id_usuario_solicitante,
    });

    return updated;
  }
}
