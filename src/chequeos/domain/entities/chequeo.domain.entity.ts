import { Usuario } from "../../../usuarios/domain/entities/usuario.domain.entity";

export class Chequeo {
  constructor(
    public readonly id_chequeo: number,
    public fecha: Date,
    public id_usuario: number,
    public id_solicitud?: number,
    public usuario?: Usuario,
  ) {}
}
