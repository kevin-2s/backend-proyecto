import { Usuario } from '../../../usuarios/domain/entities/usuario.domain.entity';
import { Item } from '../../../items/domain/entities/item.domain.entity';
import { Sitio } from '../../../sitios/domain/entities/sitio.domain.entity';

export enum EstadoTraslado {
  PENDIENTE = 'PENDIENTE',
  APROBADO = 'APROBADO',
  RECHAZADO = 'RECHAZADO',
}

export class Traslado {
  constructor(
    public readonly id_traslado: number,
    public id_item: number,
    public id_sitio_origen: number,
    public id_sitio_destino: number,
    public id_usuario_solicita: number,
    public estado: string,
    public fecha_solicitud: Date,
    public justificacion: string | null = null,
    public id_usuario_aprueba?: number | null,
    public fecha_resolucion?: Date | null,
    public observacion_resolucion?: string | null,
    public item?: Item,
    public sitio_origen?: Sitio,
    public sitio_destino?: Sitio,
    public usuario_solicita?: Usuario,
    public usuario_aprueba?: Usuario,
  ) {}
}
