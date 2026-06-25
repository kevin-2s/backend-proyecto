import { Sitio, TipoSitio } from '../../entities/sitio.domain.entity';

export const SITIOS_USE_CASES = Symbol('SITIOS_USE_CASES');

export interface ISitiosUseCases {
  obtenerSitios(): Promise<Sitio[]>;
  obtenerSitioPorId(id: number): Promise<Sitio>;
  crearSitio(data: { nombre: string; tipo: TipoSitio; tipo_personalizado?: string | null; codigo_lugar?: string | null; id_responsable?: number | null; id_centro?: number | null }): Promise<Sitio>;
  actualizarSitio(id: number, data: Partial<Sitio>): Promise<Sitio>;
  eliminarSitio(id: number): Promise<void>;
}
