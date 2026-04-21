import { Injectable, Inject } from '@nestjs/common';
import { IFichasUseCases } from '../../domain/ports/input/fichas-use-cases.interface';
import { IFichasRepository, FICHAS_REPOSITORY } from '../../domain/ports/output/fichas-repository.interface';
import { Ficha } from '../../domain/entities/ficha.domain.entity';
import { FichaNotFoundException } from '../../domain/exceptions/ficha-not-found.exception';

@Injectable()
export class FichasService implements IFichasUseCases {
  constructor(
    @Inject(FICHAS_REPOSITORY)
    private readonly fichasRepository: IFichasRepository,
  ) {}

  async obtenerFichas(): Promise<Ficha[]> {
    return this.fichasRepository.findAll();
  }

  async obtenerFichaPorId(id: number): Promise<Ficha> {
    const ficha = await this.fichasRepository.findById(id);
    if (!ficha) {
      throw new FichaNotFoundException(id);
    }
    return ficha;
  }

  async crearFicha(data: { numero_ficha: string; programa: string; id_responsable?: number | null }): Promise<Ficha> {
    return this.fichasRepository.create(data);
  }
}
