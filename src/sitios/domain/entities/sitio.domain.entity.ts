import { Usuario } from '../../../usuarios/domain/entities/usuario.domain.entity';
import { Centro } from '../../../centros/domain/entities/centro.domain.entity';

export enum TipoSitio {
  BODEGA = 'BODEGA',
  AMBIENTE = 'AMBIENTE',
  LABORATORIO = 'LABORATORIO',
  OTRO = 'OTRO',
}

export class Sitio {
  constructor(
    public readonly id_sitio: number,
    public nombre: string,
    public tipo: string,
    public id_responsable?: number | null,
    public responsable?: Usuario,
    public id_centro?: number | null,
    public centro?: Centro,
    public estado: boolean = true,
    public tipo_personalizado?: string | null,
    public codigo_lugar?: string | null,
  ) {}
}
