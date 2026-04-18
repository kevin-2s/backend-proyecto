import { Solicitud } from '../../../solicitudes/domain/entities/solicitud.domain.entity';
import { Devolucion } from '../../../devoluciones/domain/entities/devolucion.domain.entity';

export enum TipoActa {
  ASIGNACION = 'ASIGNACION',
  DEVOLUCION = 'DEVOLUCION',
  BAJA = 'BAJA',
}

export class Acta {
  constructor(
    public readonly id_acta: number,
    public tipo: TipoActa,
    public archivo_url: string,
    public id_solicitud?: number | null,
    public id_devolucion?: number | null,
    public solicitud?: Solicitud,
    public devolucion?: Devolucion,
  ) {}
}
