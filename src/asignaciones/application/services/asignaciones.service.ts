import { Injectable, Inject } from '@nestjs/common';
import { IAsignacionesUseCases } from '../../domain/ports/input/asignaciones-use-cases.interface';
import { IAsignacionesRepository, ASIGNACIONES_REPOSITORY } from '../../domain/ports/output/asignaciones-repository.interface';
import { Asignacion, EstadoAsignacion } from '../../domain/entities/asignacion.domain.entity';
import { AsignacionNotFoundException } from '../../domain/exceptions/asignacion-not-found.exception';

@Injectable()
export class AsignacionesService implements IAsignacionesUseCases {
  constructor(
    @Inject(ASIGNACIONES_REPOSITORY)
    private readonly repository: IAsignacionesRepository,
  ) {}

  async obtenerAsignaciones(): Promise<Asignacion[]> {
    return this.repository.findAll();
  }

  async obtenerAsignacionPorId(id: number): Promise<Asignacion> {
    const asignacion = await this.repository.findById(id);
    if (!asignacion) throw new AsignacionNotFoundException(id);
    return asignacion;
  }

  async crearAsignacion(data: {
    id_ficha: number;
    id_producto: number;
    cantidad: number;
    id_usuario_asigna: number;
    observacion?: string | null;
    id_items?: number[];
    fecha_devolucion?: string | Date | null;
  }): Promise<Asignacion> {
    let itemIds: number[];
    if (data.id_items && data.id_items.length > 0) {
      // Usar ítems específicos provistos — marcarlos como PRESTADO directamente
      for (const id_item of data.id_items) {
        await this.repository.marcarItemComoPrestado(id_item);
      }
      itemIds = data.id_items;
    } else {
      console.log(`[Asignacion] descontando ${data.cantidad} unidades del producto ${data.id_producto}`);
      itemIds = await this.repository.descontarStock(data.id_producto, data.cantidad);
      console.log(`[Asignacion] stock descontado OK`);
    }
    const asignacion = await this.repository.create({
      id_ficha: data.id_ficha,
      id_producto: data.id_producto,
      cantidad: itemIds.length,
      id_usuario_asigna: data.id_usuario_asigna,
      observacion: data.observacion ?? null,
      fecha_asignacion: new Date(),
      estado: EstadoAsignacion.ACTIVA,
      fecha_devolucion: data.fecha_devolucion ? new Date(data.fecha_devolucion) : null,
    });
    await this.repository.vincularItems(asignacion.id_asignacion, itemIds);
    return asignacion;
  }

  async anularAsignacion(id: number): Promise<Asignacion> {
    const asignacion = await this.obtenerAsignacionPorId(id);
    if (asignacion.estado === EstadoAsignacion.ACTIVA) {
      const itemIds = await this.repository.obtenerItemsDeAsignacion(id);
      if (itemIds.length > 0) {
        await this.repository.restaurarStockPorItems(itemIds);
      } else {
        // Fallback para asignaciones creadas antes de la trazabilidad item↔asignación
        await this.repository.restaurarStock(asignacion.id_producto, asignacion.cantidad);
      }
    }
    return this.repository.update(id, { estado: EstadoAsignacion.ANULADA });
  }

  async agregarItemAAsignacion(id_asignacion: number, id_item: number): Promise<Asignacion> {
    const asignacion = await this.obtenerAsignacionPorId(id_asignacion);
    if (asignacion.estado !== EstadoAsignacion.ACTIVA) {
      throw new Error('Solo se pueden agregar ítems a una asignación activa');
    }
    const item = await this.repository.obtenerItemParaAsignar(id_item);
    if (!item) {
      throw new Error(`Ítem con id ${id_item} no encontrado`);
    }
    if (item.id_producto !== asignacion.id_producto) {
      throw new Error('El ítem no pertenece al mismo producto de esta asignación');
    }
    if (item.estado !== 'DISPONIBLE') {
      throw new Error(`El ítem no está disponible (estado actual: ${item.estado})`);
    }
    await this.repository.marcarItemComoPrestado(id_item);
    await this.repository.vincularItems(id_asignacion, [id_item]);
    await this.repository.incrementarCantidad(id_asignacion, 1);
    return this.obtenerAsignacionPorId(id_asignacion);
  }

  async eliminarAsignacion(id: number): Promise<void> {
    await this.obtenerAsignacionPorId(id);
    return this.repository.delete(id);
  }
}
