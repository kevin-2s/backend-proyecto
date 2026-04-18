import { Usuario } from '../../../usuarios/domain/entities/usuario.domain.entity';

export class Notificacion {
  constructor(
    public readonly id_notificacion: number,
    public tipo: string,
    public mensaje: string,
    public leido: boolean,
    public fecha: Date,
    public id_usuario: number,
    public usuario?: Usuario,
  ) {}
}
