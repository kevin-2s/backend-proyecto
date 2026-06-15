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
  }): Promise<Asignacion> {
    console.log(`[Asignacion] descontando ${data.cantidad} unidades del producto ${data.id_producto}`);
    await this.repository.descontarStock(data.id_producto, data.cantidad);
    console.log(`[Asignacion] stock descontado OK`);
    return this.repository.create({
      id_ficha: data.id_ficha,
      id_producto: data.id_producto,
      cantidad: data.cantidad,
      id_usuario_asigna: data.id_usuario_asigna,
      observacion: data.observacion ?? null,
      fecha_asignacion: new Date(),
      estado: EstadoAsignacion.ACTIVA,
    });
  }

  async anularAsignacion(id: number): Promise<Asignacion> {
    const asignacion = await this.obtenerAsignacionPorId(id);
    if (asignacion.estado === EstadoAsignacion.ACTIVA) {
      await this.repository.restaurarStock(asignacion.id_producto, asignacion.cantidad);
    }
    return this.repository.update(id, { estado: EstadoAsignacion.ANULADA });
  }

  async eliminarAsignacion(id: number): Promise<void> {
    await this.obtenerAsignacionPorId(id);
    return this.repository.delete(id);
  }
}
