import { Injectable, Inject } from '@nestjs/common';
import { IProductosUseCases } from '../../domain/ports/input/productos-use-cases.interface';
import { IProductosRepository, PRODUCTOS_REPOSITORY } from '../../domain/ports/output/productos-repository.interface';
import { Producto, TipoMaterial } from '../../domain/entities/producto.domain.entity';
import { ProductoNotFoundException } from '../../domain/exceptions/producto-not-found.exception';

@Injectable()
export class ProductosService implements IProductosUseCases {
  constructor(
    @Inject(PRODUCTOS_REPOSITORY)
    private readonly productosRepository: IProductosRepository,
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
    descripcion: string;
    codigo_unspsc: string;
    SKU: string;
    tipo_material: TipoMaterial;
    unidad_medida: string;
    es_psd: boolean;
    id_categoria: number;
    fecha_vencimiento?: Date | null;
  }): Promise<Producto> {
    return this.productosRepository.create(data);
  }

  async actualizarProducto(id: number, data: Partial<{
    nombre: string;
    descripcion: string;
    codigo_unspsc: string;
    SKU: string;
    tipo_material: TipoMaterial;
    unidad_medida: string;
    es_psd: boolean;
    id_categoria: number;
    fecha_vencimiento?: Date | null;
  }>): Promise<Producto> {
    await this.obtenerProductoPorId(id); // Verifica existencia
    return this.productosRepository.update(id, data);
  }

  async eliminarProducto(id: number): Promise<void> {
    await this.obtenerProductoPorId(id); // Verifica existencia
    return this.productosRepository.delete(id);
  }
}
