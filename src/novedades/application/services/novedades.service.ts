import { Injectable, Inject } from '@nestjs/common';
import { INovedadesUseCases } from '../../domain/ports/input/novedades-use-cases.interface';
import { INovedadesRepository, NOVEDADES_REPOSITORY } from '../../domain/ports/output/novedades-repository.interface';
import { Novedad, EstadoNovedad } from '../../domain/entities/novedad.domain.entity';
import { NovedadNotFoundException } from '../../domain/exceptions/novedad-not-found.exception';

@Injectable()
export class NovedadesService implements INovedadesUseCases {
  constructor(
    @Inject(NOVEDADES_REPOSITORY)
    private readonly repository: INovedadesRepository,
  ) {}

  async obtenerNovedades(): Promise<Novedad[]> {
    return this.repository.findAll();
  }

  async obtenerNovedadesPorItem(id_item: number): Promise<Novedad[]> {
    return this.repository.findByItem(id_item);
  }

  async obtenerNovedadPorId(id: number): Promise<Novedad> {
    const novedad = await this.repository.findById(id);
    if (!novedad) throw new NovedadNotFoundException(id);
    return novedad;
  }

  async crearNovedad(data: {
    tipo: string;
    descripcion: string;
    id_usuario: number;
    id_item?: number | null;
    estado?: string;
  }): Promise<Novedad> {
    return this.repository.create({
      tipo: data.tipo,
      descripcion: data.descripcion,
      id_usuario: data.id_usuario,
      id_item: data.id_item ?? null,
      estado: data.estado ?? EstadoNovedad.PENDIENTE,
      fecha: new Date(),
    });
  }

  async actualizarEstado(id: number, estado: string): Promise<Novedad> {
    await this.obtenerNovedadPorId(id);
    return this.repository.update(id, { estado });
  }

  async eliminarNovedad(id: number): Promise<void> {
    await this.obtenerNovedadPorId(id);
    return this.repository.delete(id);
  }
}
