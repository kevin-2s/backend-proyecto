import { Usuario } from '../../../usuarios/domain/entities/usuario.domain.entity';
import { Ficha } from '../../../fichas/domain/entities/ficha.domain.entity';

export enum EstadoSolicitud {
  PENDIENTE = 'PENDIENTE',
  APROBADA = 'APROBADA',
  RECHAZADA = 'RECHAZADA',
  ENTREGADA = 'ENTREGADA',
  DEVUELTA = 'DEVUELTA',
}

export enum TipoSolicitud {
  PRESTAMO = 'PRESTAMO',
}

export class Solicitud {
  constructor(
    public readonly id_solicitud: number,
    public fecha: Date,
    public estado: EstadoSolicitud,
    public tipo: TipoSolicitud,
    public observacion: string | null,
    public id_usuario: number,
    public id_usuario_aprueba?: number | null,
    public id_ficha?: number | null,
    public usuario?: Usuario,
    public usuario_aprueba?: Usuario,
    public ficha?: Ficha,
  ) {}
}
