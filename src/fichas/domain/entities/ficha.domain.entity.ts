import { Usuario } from '../../../usuarios/domain/entities/usuario.domain.entity';

export class Ficha {
  constructor(
    public readonly id_ficha: number,
    public numero_ficha: string,
    public programa: string,
    public id_responsable?: number | null,
    public responsable?: Usuario,
  ) {}
}
