import { Sitio } from '../../../sitios/domain/entities/sitio.domain.entity';

export class Area {
  constructor(
    public readonly id_area: number,
    public nombre: string,
    public id_sitio: number,
    public sitio?: Sitio,
    public estado: boolean = true,
  ) {}
}
