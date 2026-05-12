import { Sitio } from '../../entities/sitio.domain.entity';

export const SITIOS_REPOSITORY = Symbol('SITIOS_REPOSITORY');

export interface ISitiosRepository {
  findAll(): Promise<Sitio[]>;
  findById(id: number): Promise<Sitio | null>;
  create(sitio: Omit<Sitio, 'id_sitio' | 'responsable'>): Promise<Sitio>;
}
