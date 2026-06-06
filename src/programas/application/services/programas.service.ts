import { Injectable, Inject } from '@nestjs/common';
import { IProgramasUseCases } from '../../domain/ports/input/programas-use-cases.interface';
import { IProgramasRepository, PROGRAMAS_REPOSITORY } from '../../domain/ports/output/programas-repository.interface';
import { Programa } from '../../domain/entities/programa.domain.entity';
import { ProgramaNotFoundException } from '../../domain/exceptions/programa-not-found.exception';

@Injectable()
export class ProgramasService implements IProgramasUseCases {
  constructor(
    @Inject(PROGRAMAS_REPOSITORY)
    private readonly programasRepository: IProgramasRepository,
  ) {}

  async obtenerProgramas(): Promise<Programa[]> {
    return this.programasRepository.findAll();
  }

  async obtenerProgramaPorId(id: number): Promise<Programa> {
    const programa = await this.programasRepository.findById(id);
    if (!programa) {
      throw new ProgramaNotFoundException(id);
    }
    return programa;
  }

  async crearPrograma(data: { codigo: string; nombre: string; id_area: number; estado?: boolean }): Promise<Programa> {
    return this.programasRepository.create(data);
  }

  async actualizarPrograma(id: number, data: Partial<Programa>): Promise<Programa> {
    await this.obtenerProgramaPorId(id);
    return this.programasRepository.update(id, data);
  }

  async eliminarPrograma(id: number): Promise<void> {
    await this.obtenerProgramaPorId(id);
    await this.programasRepository.delete(id);
  }
}
