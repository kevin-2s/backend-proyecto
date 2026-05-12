import { Solicitud } from '../../entities/solicitud.domain.entity';

export const SOLICITUDES_REPOSITORY = Symbol('SOLICITUDES_REPOSITORY');

export interface ISolicitudesRepository {
  findAll(): Promise<Solicitud[]>;
  findById(id: number): Promise<Solicitud | null>;
  create(solicitud: Omit<Solicitud, 'id_solicitud' | 'usuario' | 'usuario_aprueba' | 'ficha'>): Promise<Solicitud>;
  update(id: number, solicitud: Partial<Solicitud>): Promise<Solicitud>;
}
