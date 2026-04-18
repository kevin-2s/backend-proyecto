import { Injectable, Inject } from '@nestjs/common';
import { IChequeosUseCases } from '../../domain/ports/input/chequeos-use-cases.interface';
import { IChequeosRepository, CHEQUEOS_REPOSITORY } from '../../domain/ports/output/chequeos-repository.interface';
import { Chequeo } from '../../domain/entities/chequeo.domain.entity';
import { ChequeoNotFoundException } from '../../domain/exceptions/chequeo-not-found.exception';

@Injectable()
export class ChequeosService implements IChequeosUseCases {
  constructor(
    @Inject(CHEQUEOS_REPOSITORY)
    private readonly chequeosRepository: IChequeosRepository,
  ) {}

  async obtenerChequeos(): Promise<Chequeo[]> {
    return this.chequeosRepository.findAll();
  }

  async obtenerChequeoPorId(id: number): Promise<Chequeo> {
    const chequeo = await this.chequeosRepository.findById(id);
    if (!chequeo) {
      throw new ChequeoNotFoundException(id);
    }
    return chequeo;
  }

  async crearChequeo(data: { observacion: string; id_usuario: number }): Promise<Chequeo> {
    return this.chequeosRepository.create({
      observacion: data.observacion,
      fecha: new Date(),
      id_usuario: data.id_usuario,
    });
  }
}
