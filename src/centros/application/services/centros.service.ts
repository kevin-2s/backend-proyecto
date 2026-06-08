import { Injectable, Inject } from '@nestjs/common';
import { ICentrosUseCases } from '../../domain/ports/input/centros-use-cases.interface';
import { ICentrosRepository, CENTROS_REPOSITORY } from '../../domain/ports/output/centros-repository.interface';
import { Centro } from '../../domain/entities/centro.domain.entity';
import { CentroNotFoundException } from '../../domain/exceptions/centro-not-found.exception';

@Injectable()
export class CentrosService implements ICentrosUseCases {
  constructor(
    @Inject(CENTROS_REPOSITORY)
    private readonly centrosRepository: ICentrosRepository,
  ) {}

  async obtenerCentros(): Promise<Centro[]> {
    return this.centrosRepository.findAll();
  }

  async obtenerCentroPorId(id: number): Promise<Centro> {
    const centro = await this.centrosRepository.findById(id);
    if (!centro) {
      throw new CentroNotFoundException(id);
    }
    return centro;
  }

  async crearCentro(data: { nombre: string; codigo: string; regional: string; estado?: boolean }): Promise<Centro> {
    return this.centrosRepository.create({
      nombre: data.nombre,
      codigo: data.codigo,
      regional: data.regional,
      estado: data.estado !== false,
    } as any);
  }

  async actualizarCentro(id: number, data: Partial<Centro>): Promise<Centro> {
    await this.obtenerCentroPorId(id);
    return this.centrosRepository.update(id, data);
  }

  async eliminarCentro(id: number): Promise<void> {
    await this.obtenerCentroPorId(id);
    await this.centrosRepository.delete(id);
  }
}
