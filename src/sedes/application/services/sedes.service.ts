import { Injectable, Inject } from '@nestjs/common';
import { ISedesUseCases } from '../../domain/ports/input/sedes-use-cases.interface';
import { ISedesRepository, SEDES_REPOSITORY } from '../../domain/ports/output/sedes-repository.interface';
import { Sede } from '../../domain/entities/sede.domain.entity';
import { SedeNotFoundException } from '../../domain/exceptions/sede-not-found.exception';

@Injectable()
export class SedesService implements ISedesUseCases {
  constructor(
    @Inject(SEDES_REPOSITORY)
    private readonly sedesRepository: ISedesRepository,
  ) {}

  async obtenerSedes(): Promise<Sede[]> {
    return this.sedesRepository.findAll();
  }

  async obtenerSedePorId(id: number): Promise<Sede> {
    const Sede = await this.sedesRepository.findById(id);
    if (!Sede) {
      throw new SedeNotFoundException(id);
    }
    return Sede;
  }

  async crearSede(data: { nombre: string; direccion: string; id_centro: number; estado?: boolean }): Promise<Sede> {
    return this.sedesRepository.create({
      nombre: data.nombre,
      direccion: data.direccion,
      id_centro: data.id_centro,
      estado: data.estado !== false,
    } as any);
  }

  async actualizarSede(id: number, data: Partial<Sede>): Promise<Sede> {
    await this.obtenerSedePorId(id);
    return this.sedesRepository.update(id, data);
  }

  async eliminarSede(id: number): Promise<void> {
    await this.obtenerSedePorId(id);
    await this.sedesRepository.delete(id);
  }
}
