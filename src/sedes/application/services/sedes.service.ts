import { Injectable, Inject } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ISedesUseCases } from '../../domain/ports/input/sedes-use-cases.interface';
import { ISedesRepository, SEDES_REPOSITORY } from '../../domain/ports/output/sedes-repository.interface';
import { Sede } from '../../domain/entities/sede.domain.entity';
import { SedeNotFoundException } from '../../domain/exceptions/sede-not-found.exception';

@Injectable()
export class SedesService implements ISedesUseCases {
  constructor(
    @Inject(SEDES_REPOSITORY)
    private readonly sedesRepository: ISedesRepository,
    private readonly dataSource: DataSource,
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

  async crearSede(data: { nombre: string; direccion: string; id_centro: number; id_administrador: number; estado?: boolean }): Promise<Sede> {
    const sede = await this.sedesRepository.create({
      nombre: data.nombre,
      direccion: data.direccion,
      id_centro: data.id_centro,
      id_administrador: data.id_administrador,
      estado: data.estado !== false,
    } as any);

    if (data.id_administrador) {
      await this.dataSource.query(
        `UPDATE usuario SET tenant_id = $1 WHERE id_usuario = $2`,
        [sede.id_sede.toString(), data.id_administrador]
      );
    }
    return sede;
  }

  async actualizarSede(id: number, data: Partial<Sede>): Promise<Sede> {
    await this.obtenerSedePorId(id);
    const updatedSede = await this.sedesRepository.update(id, data);
    
    if (data.id_administrador) {
      await this.dataSource.query(
        `UPDATE usuario SET tenant_id = $1 WHERE id_usuario = $2`,
        [id.toString(), data.id_administrador]
      );
    }
    return updatedSede;
  }

  async eliminarSede(id: number): Promise<void> {
    await this.obtenerSedePorId(id);
    await this.sedesRepository.delete(id);
  }
}
