import { Injectable, Inject } from '@nestjs/common';
import { ISitiosUseCases } from '../../domain/ports/input/sitios-use-cases.interface';
import { ISitiosRepository, SITIOS_REPOSITORY } from '../../domain/ports/output/sitios-repository.interface';
import { Sitio, TipoSitio } from '../../domain/entities/sitio.domain.entity';
import { SitioNotFoundException } from '../../domain/exceptions/sitio-not-found.exception';

@Injectable()
export class SitiosService implements ISitiosUseCases {
  constructor(
    @Inject(SITIOS_REPOSITORY)
    private readonly sitiosRepository: ISitiosRepository,
  ) {}

  async obtenerSitios(): Promise<Sitio[]> {
    return this.sitiosRepository.findAll();
  }

  async obtenerSitioPorId(id: number): Promise<Sitio> {
    const sitio = await this.sitiosRepository.findById(id);
    if (!sitio) {
      throw new SitioNotFoundException(id);
    }
    return sitio;
  }

  async crearSitio(data: { nombre: string; tipo: TipoSitio; id_responsable?: number | null }): Promise<Sitio> {
    return this.sitiosRepository.create(data);
  }
}
