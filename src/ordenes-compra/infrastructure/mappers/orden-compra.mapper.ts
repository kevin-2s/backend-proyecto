import { OrdenCompraDomainEntity } from '../../domain/entities/orden-compra.domain.entity';
import { OrdenCompraOrmEntity } from '../entities/orden-compra.orm-entity';

export class OrdenCompraMapper {
  static toDomainEntity(ormEntity: OrdenCompraOrmEntity): OrdenCompraDomainEntity {
    const domainEntity = new OrdenCompraDomainEntity();
    domainEntity.id_orden = ormEntity.id_orden;
    domainEntity.id_proveedor = ormEntity.id_proveedor;
    domainEntity.id_item = ormEntity.id_item;
    domainEntity.cantidad = ormEntity.cantidad;
    domainEntity.precio_unitario = ormEntity.precio_unitario;
    domainEntity.precio_total = ormEntity.precio_total;
    domainEntity.fecha_orden = ormEntity.fecha_orden;
    domainEntity.estado = ormEntity.estado;
    domainEntity.observacion = ormEntity.observacion;
    return domainEntity;
  }

  static toOrmEntity(domainEntity: OrdenCompraDomainEntity): OrdenCompraOrmEntity {
    const ormEntity = new OrdenCompraOrmEntity();
    if (domainEntity.id_orden) {
      ormEntity.id_orden = domainEntity.id_orden;
    }
    ormEntity.id_proveedor = domainEntity.id_proveedor;
    ormEntity.id_item = domainEntity.id_item;
    ormEntity.cantidad = domainEntity.cantidad;
    ormEntity.precio_unitario = domainEntity.precio_unitario;
    
    // Calculate total price if not explicitly set
    ormEntity.precio_total = domainEntity.precio_total !== undefined 
        ? domainEntity.precio_total 
        : (domainEntity.cantidad * domainEntity.precio_unitario);
        
    if (domainEntity.fecha_orden) {
      ormEntity.fecha_orden = domainEntity.fecha_orden;
    }
    if (domainEntity.estado) {
      ormEntity.estado = domainEntity.estado;
    }
    if (domainEntity.observacion !== undefined) {
      ormEntity.observacion = domainEntity.observacion;
    }
    return ormEntity;
  }
}
