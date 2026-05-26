import { Categoria } from '../../../categorias/domain/entities/categoria.domain.entity';

export enum TipoMaterial {
  CONSUMO = 'CONSUMO',
  DEVOLUTIVO = 'DEVOLUTIVO',
  SOFTWARE = 'SOFTWARE',
  EPP = 'EPP',
}

export class Producto {
  constructor(
    public readonly id_producto: number,
    public nombre: string,
    public descripcion: string | null,
    public codigo_unspsc: string,
    public SKU: string,
    public tipo_material: string,
    public unidad_medida: string,
    public es_psd: boolean,
    public id_categoria: number,
    public stock_minimo: number,
    public fecha_vencimiento?: Date | null,
    public categoria?: Categoria,
  ) {}
}
