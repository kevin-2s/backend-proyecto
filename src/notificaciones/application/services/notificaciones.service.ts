import { Injectable, Inject } from "@nestjs/common";
import { INotificacionesUseCases } from "../../domain/ports/input/notificaciones-use-cases.interface";
import {
  INotificacionesRepository,
  NOTIFICACIONES_REPOSITORY,
} from "../../domain/ports/output/notificaciones-repository.interface";
import { Notificacion } from "../../domain/entities/notificacion.domain.entity";

@Injectable()
export class NotificacionesService implements INotificacionesUseCases {
  constructor(
    @Inject(NOTIFICACIONES_REPOSITORY)
    private readonly repository: INotificacionesRepository,
  ) {}

  async obtenerNotificacionesUsuario(
    id_usuario: number,
  ): Promise<Notificacion[]> {
    return this.repository.findByUsuarioId(id_usuario);
  }

  async crearNotificacion(data: {
    mensaje: string;
    id_usuario: number;
  }): Promise<Notificacion> {
    return this.repository.create(data);
  }

  async marcarNotificacionComoLeida(
    id_notificacion: number,
  ): Promise<Notificacion> {
    return this.repository.marcarLeida(id_notificacion);
  }
}
