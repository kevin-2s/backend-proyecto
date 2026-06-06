import { Usuario } from '../../../usuarios/domain/entities/usuario.domain.entity';
import { Programa } from '../../../programas/domain/entities/programa.domain.entity';

export class Ficha {
  constructor(
    public readonly id_ficha: number,
    public numero_ficha: string,
    public id_programa: number,
    public programa?: Programa,
    public id_responsable?: number | null,
    public responsable?: Usuario,
    public ambiente?: string,
    public estado?: boolean,
  ) {}
}
