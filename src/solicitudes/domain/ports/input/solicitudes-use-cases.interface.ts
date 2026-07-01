import { Solicitud, EstadoSolicitud, TipoSolicitud } from '../../entities/solicitud.domain.entity';

export const SOLICITUDES_USE_CASES = Symbol('SOLICITUDES_USE_CASES');

export interface ISolicitudesUseCases {
  obtenerSolicitudes(userId: number, role: string): Promise<Solicitud[]>;
  obtenerSolicitudPorId(id: number): Promise<Solicitud>;
  crearSolicitud(data: {
    tipo: TipoSolicitud;
    id_producto: number;
    cantidad: number;
    observacion?: string | null;
    id_usuario: number;
    id_ficha?: number | null;
  }): Promise<Solicitud>;
  cambiarEstadoSolicitud(id: number, estado: EstadoSolicitud, id_usuario_aprueba: number, isAdmin: boolean): Promise<Solicitud>;
  entregarSolicitud(id: number): Promise<Solicitud>;
}
