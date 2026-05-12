import { Notificacion } from "../../entities/notificacion.domain.entity";

export const NOTIFICACIONES_USE_CASES = Symbol("NOTIFICACIONES_USE_CASES");

export interface INotificacionesUseCases {
  obtenerNotificacionesUsuario(id_usuario: number): Promise<Notificacion[]>;
  crearNotificacion(data: {
    mensaje: string;
    id_usuario: number;
  }): Promise<Notificacion>;
  marcarNotificacionComoLeida(id_notificacion: number): Promise<Notificacion>;
}
