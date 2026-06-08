import { ProveedorDomainEntity } from '../../domain/entities/proveedor.domain.entity';
import { ProveedorOrmEntity } from '../entities/proveedor.orm-entity';

export class ProveedorMapper {
  static toDomainEntity(ormEntity: ProveedorOrmEntity): ProveedorDomainEntity {
    const domainEntity = new ProveedorDomainEntity();
    domainEntity.id_proveedor = ormEntity.id_proveedor;
    domainEntity.nombre_empresa = ormEntity.nombre_empresa;
    domainEntity.nit = ormEntity.nit;
    domainEntity.contacto = ormEntity.contacto;
    domainEntity.telefono = ormEntity.telefono;
    domainEntity.correo = ormEntity.correo;
    domainEntity.direccion = ormEntity.direccion;
    domainEntity.estado = ormEntity.estado;
    return domainEntity;
  }

  static toOrmEntity(domainEntity: ProveedorDomainEntity): ProveedorOrmEntity {
    const ormEntity = new ProveedorOrmEntity();
    if (domainEntity.id_proveedor) {
      ormEntity.id_proveedor = domainEntity.id_proveedor;
    }
    ormEntity.nombre_empresa = domainEntity.nombre_empresa;
    ormEntity.nit = domainEntity.nit;
    ormEntity.contacto = domainEntity.contacto;
    ormEntity.telefono = domainEntity.telefono;
    ormEntity.correo = domainEntity.correo;
    ormEntity.direccion = domainEntity.direccion;
    if (domainEntity.estado !== undefined) {
      ormEntity.estado = domainEntity.estado;
    }
    return ormEntity;
  }
}
