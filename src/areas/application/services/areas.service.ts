import { Injectable, Inject } from '@nestjs/common';
import { IAreasUseCases } from '../../domain/ports/input/areas-use-cases.interface';
import { IAreasRepository, AREAS_REPOSITORY } from '../../domain/ports/output/areas-repository.interface';
import { Area } from '../../domain/entities/area.domain.entity';
import { AreaNotFoundException } from '../../domain/exceptions/area-not-found.exception';

@Injectable()
export class AreasService implements IAreasUseCases {
  constructor(
    @Inject(AREAS_REPOSITORY)
    private readonly areasRepository: IAreasRepository,
  ) {}

  async obtenerAreas(): Promise<Area[]> {
    return this.areasRepository.findAll();
  }

  async obtenerAreaPorId(id: number): Promise<Area> {
    const area = await this.areasRepository.findById(id);
    if (!area) {
      throw new AreaNotFoundException(id);
    }
    return area;
  }

  async crearArea(data: { nombre: string; estado?: boolean }): Promise<Area> {
    return this.areasRepository.create({
      nombre: data.nombre,
      estado: data.estado !== false,
    });
  }

  async actualizarArea(id: number, data: Partial<Area>): Promise<Area> {
    await this.obtenerAreaPorId(id);
    return this.areasRepository.update(id, data);
  }

  async eliminarArea(id: number): Promise<void> {
    await this.obtenerAreaPorId(id);
    await this.areasRepository.delete(id);
  }
}
