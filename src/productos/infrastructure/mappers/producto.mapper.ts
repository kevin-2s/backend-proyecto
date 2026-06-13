import { Producto } from '../../domain/entities/producto.domain.entity';
import { ProductoOrmEntity } from '../entities/producto.orm-entity';
import { CategoriaMapper } from '../../../categorias/infrastructure/mappers/categoria.mapper';

export class ProductoMapper {
  static toDomain(ormEntity: ProductoOrmEntity): Producto {
    return new Producto(
      ormEntity.id_producto,
      ormEntity.nombre,
      ormEntity.descripcion,
      ormEntity.codigo_unspsc,
      ormEntity.SKU,
      ormEntity.tipo_material,
      ormEntity.unidad_medida,
      ormEntity.es_psd,
      ormEntity.id_categoria,
      ormEntity.stock_minimo,
      ormEntity.fecha_vencimiento,
      ormEntity.categoria ? CategoriaMapper.toDomain(ormEntity.categoria) : undefined,
      ormEntity.unidad_peso_bulto,
      ormEntity.peso_por_bulto != null ? Number(ormEntity.peso_por_bulto) : null,
      ormEntity.id_sitio,
    );
  }

  static toEntity(domainEntity: Partial<Producto>): ProductoOrmEntity {
    const ormEntity = new ProductoOrmEntity();
    if (domainEntity.id_producto !== undefined) ormEntity.id_producto = domainEntity.id_producto;
    if (domainEntity.nombre !== undefined) ormEntity.nombre = domainEntity.nombre;
    if (domainEntity.descripcion !== undefined) ormEntity.descripcion = domainEntity.descripcion;
    if (domainEntity.codigo_unspsc !== undefined) ormEntity.codigo_unspsc = domainEntity.codigo_unspsc;
    if (domainEntity.SKU !== undefined) ormEntity.SKU = domainEntity.SKU;
    if (domainEntity.tipo_material !== undefined) ormEntity.tipo_material = domainEntity.tipo_material;
    if (domainEntity.unidad_medida !== undefined) ormEntity.unidad_medida = domainEntity.unidad_medida;
    if (domainEntity.es_psd !== undefined) ormEntity.es_psd = domainEntity.es_psd;
    if (domainEntity.fecha_vencimiento !== undefined) ormEntity.fecha_vencimiento = domainEntity.fecha_vencimiento;
    if (domainEntity.id_categoria !== undefined) ormEntity.id_categoria = domainEntity.id_categoria;
    if (domainEntity.stock_minimo !== undefined) ormEntity.stock_minimo = domainEntity.stock_minimo;
    if (domainEntity.unidad_peso_bulto !== undefined) ormEntity.unidad_peso_bulto = domainEntity.unidad_peso_bulto;
    if (domainEntity.peso_por_bulto !== undefined) ormEntity.peso_por_bulto = domainEntity.peso_por_bulto;
    if (domainEntity.id_sitio !== undefined) ormEntity.id_sitio = domainEntity.id_sitio ?? null;
    return ormEntity;
  }
}
