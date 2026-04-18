import { Solicitud } from '../../../solicitudes/domain/entities/solicitud.domain.entity';
import { Usuario } from '../../../usuarios/domain/entities/usuario.domain.entity';

export class Devolucion {
  constructor(
    public readonly id_devolucion: number,
    public fecha: Date,
    public id_solicitud: number,
    public id_usuario_recibe: number,
    public solicitud?: Solicitud,
    public usuario_recibe?: Usuario,
  ) {}
}
