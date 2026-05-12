import { Solicitud } from "../../../solicitudes/domain/entities/solicitud.domain.entity";

export enum EstadoDevolucion {
  BUENO = "BUENO",
  REGULAR = "REGULAR",
  DAÑADO = "DAÑADO",
  PERDIDO = "PERDIDO",
}

export class Devolucion {
  constructor(
    public readonly id_devolucion: number,
    public fecha: Date,
    public estado: EstadoDevolucion,
    public observacion: string | null,
    public id_solicitud: number,
    public id_item: number,
    public solicitud?: Solicitud,
  ) {}
}
