import { DetalleSolicitud } from '../../entities/detalle-solicitud.domain.entity';

export const DETALLE_SOLICITUD_REPOSITORY = Symbol('DETALLE_SOLICITUD_REPOSITORY');

export interface IDetalleSolicitudRepository {
  findAll(): Promise<DetalleSolicitud[]>;
  create(detalle: Omit<DetalleSolicitud, 'id_detalle' | 'solicitud' | 'producto'>): Promise<DetalleSolicitud>;
}
