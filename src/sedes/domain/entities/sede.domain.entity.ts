import { Centro } from '../../../centros/domain/entities/centro.domain.entity';

export class Sede {
  constructor(
    public readonly id_sede: number,
    public nombre: string,
    public direccion: string,
    public id_centro: number,
    public centro?: Centro,
    public estado: boolean = true,
  ) {}
}
