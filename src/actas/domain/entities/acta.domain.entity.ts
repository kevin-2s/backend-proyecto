import { Solicitud } from "../../../solicitudes/domain/entities/solicitud.domain.entity";

export class Acta {
  constructor(
    public readonly id_acta: number,
    public fecha: Date,
    public url_pdf: string | null,
    public id_solicitud?: number,
    public id_usuario?: number,
    public solicitud?: Solicitud,
  ) {}
}
