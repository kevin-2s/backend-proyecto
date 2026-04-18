import { Notificacion } from '../../entities/notificacion.domain.entity';

export const NOTIFICACIONES_REPOSITORY = Symbol('NOTIFICACIONES_REPOSITORY');

export interface INotificacionesRepository {
  findByUsuarioId(id_usuario: number): Promise<Notificacion[]>;
  create(notificacion: Omit<Notificacion, 'id_notificacion' | 'leido' | 'fecha' | 'usuario'>): Promise<Notificacion>;
  marcarLeida(id_notificacion: number): Promise<Notificacion>;
}
