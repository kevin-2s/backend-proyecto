import { Injectable, Inject } from '@nestjs/common';
import { IProductosUseCases } from '../../domain/ports/input/productos-use-cases.interface';
import { IProductosRepository, PRODUCTOS_REPOSITORY } from '../../domain/ports/output/productos-repository.interface';
import { Producto, TipoMaterial } from '../../domain/entities/producto.domain.entity';
import { ProductoNotFoundException } from '../../domain/exceptions/producto-not-found.exception';
import { IItemsRepository, ITEMS_REPOSITORY } from '../../../items/domain/ports/output/items-repository.interface';
import { Item } from '../../../items/domain/entities/item.domain.entity';

@Injectable()
export class ProductosService implements IProductosUseCases {
  constructor(
    @Inject(PRODUCTOS_REPOSITORY)
    private readonly productosRepository: IProductosRepository,
    @Inject(ITEMS_REPOSITORY)
    private readonly itemsRepository: IItemsRepository,
  ) {}

  async obtenerProductos(): Promise<Producto[]> {
    return this.productosRepository.findAll();
  }

  async obtenerProductoPorId(id: number): Promise<Producto> {
    const producto = await this.productosRepository.findById(id);
    if (!producto) {
      throw new ProductoNotFoundException(id);
    }
    return producto;
  }

  async crearProducto(data: {
    nombre: string;
    descripcion?: string | null;
    codigo_unspsc?: string | null;
    SKU?: string | null;
    tipo_material: TipoMaterial;
    unidad_medida: string;
    es_psd: boolean;
    id_categoria: number;
    stock_minimo: number;
    cantidad: number;
    fecha_vencimiento?: Date | null;
    unidad_peso_bulto?: string | null;
    peso_por_bulto?: number | null;
    id_sitio?: number | null;
  }): Promise<{ producto: Producto; items_generados: Item[] }> {
    const producto = await this.productosRepository.create({
      nombre: data.nombre,
      descripcion: data.descripcion ?? null,
      codigo_unspsc: data.codigo_unspsc ?? null,
      SKU: data.SKU ?? null,
      tipo_material: data.tipo_material,
      unidad_medida: data.unidad_medida,
      es_psd: data.es_psd,
      id_categoria: data.id_categoria,
      stock_minimo: data.stock_minimo,
      fecha_vencimiento: data.fecha_vencimiento ?? null,
      unidad_peso_bulto: data.unidad_peso_bulto ?? null,
      peso_por_bulto: data.peso_por_bulto ?? null,
      id_sitio: data.id_sitio ?? null,
    });

    const items_generados: Item[] = [];
    for (let i = 0; i < data.cantidad; i++) {
      const padNum = String(i + 1).padStart(3, '0');
      const baseSku = producto.SKU || `PROD-${producto.id_producto}`;
      const itemSku = `${baseSku}-${padNum}`;

      const item = await this.itemsRepository.create({
        codigo_sku: itemSku,
        estado: 'DISPONIBLE',
        id_producto: producto.id_producto,
      });

      items_generados.push(item);
    }

    return { producto, items_generados };
  }

  async actualizarProducto(id: number, data: Partial<{
    nombre: string;
    descripcion: string;
    codigo_unspsc: string | null;
    SKU: string | null;
    tipo_material: TipoMaterial;
    unidad_medida: string;
    es_psd: boolean;
    id_categoria: number;
    stock_minimo: number;
    fecha_vencimiento?: Date | null;
    unidad_peso_bulto?: string | null;
    peso_por_bulto?: number | null;
    id_sitio?: number | null;
  }>): Promise<Producto> {
    await this.obtenerProductoPorId(id);
    return this.productosRepository.update(id, data);
  }

  async eliminarProducto(id: number): Promise<void> {
    await this.obtenerProductoPorId(id);
    return this.productosRepository.delete(id);
  }
}
