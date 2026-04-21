import { Usuario } from '../../../usuarios/domain/entities/usuario.domain.entity';

export enum TipoSitio {
  BODEGA = 'BODEGA',
  AMBIENTE = 'AMBIENTE',
  LABORATORIO = 'LABORATORIO',
}

export class Sitio {
  constructor(
    public readonly id_sitio: number,
    public nombre: string,
    public tipo: TipoSitio,
    public id_responsable?: number | null,
    public responsable?: Usuario,
  ) {}
}
