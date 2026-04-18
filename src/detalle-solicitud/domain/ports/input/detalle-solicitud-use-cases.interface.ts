import { DetalleSolicitud } from '../../entities/detalle-solicitud.domain.entity';

export const DETALLE_SOLICITUD_USE_CASES = Symbol('DETALLE_SOLICITUD_USE_CASES');

export interface IDetalleSolicitudUseCases {
  obtenerDetalles(): Promise<DetalleSolicitud[]>;
  crearDetalle(data: { cantidad: number; id_solicitud: number; id_producto: number }): Promise<DetalleSolicitud>;
}
