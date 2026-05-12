import { Solicitud, EstadoSolicitud, TipoSolicitud } from '../../entities/solicitud.domain.entity';

export const SOLICITUDES_USE_CASES = Symbol('SOLICITUDES_USE_CASES');

export interface ISolicitudesUseCases {
  obtenerSolicitudes(): Promise<Solicitud[]>;
  obtenerSolicitudPorId(id: number): Promise<Solicitud>;
  crearSolicitud(data: {
    tipo: TipoSolicitud;
    observacion?: string | null;
    id_usuario: number;
    id_ficha?: number | null;
  }): Promise<Solicitud>;
  cambiarEstadoSolicitud(id: number, estado: EstadoSolicitud, id_usuario_aprueba?: number): Promise<Solicitud>;
}
