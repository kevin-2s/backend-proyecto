import { Producto, TipoMaterial } from '../../entities/producto.domain.entity';
import { Item } from '../../../../items/domain/entities/item.domain.entity';

export const PRODUCTOS_USE_CASES = Symbol('PRODUCTOS_USE_CASES');

export interface IProductosUseCases {
  obtenerProductos(): Promise<Producto[]>;
  obtenerProductoPorId(id: number): Promise<Producto>;
  crearProducto(data: {
    nombre: string;
    descripcion?: string;
    codigo_unspsc: string;
    SKU: string;
    tipo_material: TipoMaterial;
    unidad_medida: string;
    es_psd: boolean;
    id_categoria: number;
    stock_minimo: number;
    cantidad: number;
    fecha_vencimiento?: Date | null;
  }): Promise<{ producto: Producto; items_generados: Item[] }>;
  actualizarProducto(id: number, data: Partial<{
    nombre: string;
    descripcion: string;
    codigo_unspsc: string;
    SKU: string;
    tipo_material: TipoMaterial;
    unidad_medida: string;
    es_psd: boolean;
    id_categoria: number;
    stock_minimo: number;
    fecha_vencimiento?: Date | null;
  }>): Promise<Producto>;
  eliminarProducto(id: number): Promise<void>;
}
