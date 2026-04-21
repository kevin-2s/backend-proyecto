import { Sitio, TipoSitio } from '../../entities/sitio.domain.entity';

export const SITIOS_USE_CASES = Symbol('SITIOS_USE_CASES');

export interface ISitiosUseCases {
  obtenerSitios(): Promise<Sitio[]>;
  obtenerSitioPorId(id: number): Promise<Sitio>;
  crearSitio(data: { nombre: string; tipo: TipoSitio; id_responsable?: number | null }): Promise<Sitio>;
}
