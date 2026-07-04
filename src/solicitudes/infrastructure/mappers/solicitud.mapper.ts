import { Solicitud } from '../../domain/entities/solicitud.domain.entity';
import { SolicitudOrmEntity } from '../entities/solicitud.orm-entity';
import { UsuarioMapper } from '../../../usuarios/infrastructure/mappers/usuario.mapper';
import { FichaMapper } from '../../../fichas/infrastructure/mappers/ficha.mapper';

export class SolicitudMapper {
  static toDomain(ormEntity: SolicitudOrmEntity): Solicitud {
    return new Solicitud(
      ormEntity.id_solicitud,
      ormEntity.fecha,
      ormEntity.estado,
      ormEntity.tipo,
      ormEntity.observacion,
      ormEntity.id_usuario,
      ormEntity.id_producto,
      ormEntity.cantidad ?? 1,
      ormEntity.id_usuario_aprueba,
      ormEntity.id_ficha,
      ormEntity.fecha_devolucion ?? null,
      ormEntity.usuario ? UsuarioMapper.toDomain(ormEntity.usuario) : undefined,
      ormEntity.usuario_aprueba ? UsuarioMapper.toDomain(ormEntity.usuario_aprueba) : undefined,
      ormEntity.ficha ? FichaMapper.toDomain(ormEntity.ficha) : undefined,
      ormEntity.producto ? {
        id_producto: ormEntity.producto.id_producto,
        nombre: ormEntity.producto.nombre,
        SKU: ormEntity.producto.SKU,
        id_sitio: ormEntity.producto.id_sitio,
        tipo_material: ormEntity.producto.tipo_material,
      } : undefined,
    );
  }

  static toEntity(domainEntity: Partial<Solicitud>): SolicitudOrmEntity {
    const ormEntity = new SolicitudOrmEntity();
    if (domainEntity.id_solicitud !== undefined) ormEntity.id_solicitud = domainEntity.id_solicitud;
    if (domainEntity.fecha !== undefined) ormEntity.fecha = domainEntity.fecha;
    if (domainEntity.estado !== undefined) ormEntity.estado = domainEntity.estado;
    if (domainEntity.tipo !== undefined) ormEntity.tipo = domainEntity.tipo;
    if (domainEntity.observacion !== undefined) ormEntity.observacion = domainEntity.observacion;
    if (domainEntity.id_usuario !== undefined) ormEntity.id_usuario = domainEntity.id_usuario;
    if (domainEntity.id_usuario_aprueba !== undefined) ormEntity.id_usuario_aprueba = domainEntity.id_usuario_aprueba ?? null as any;
    if (domainEntity.id_ficha !== undefined) ormEntity.id_ficha = domainEntity.id_ficha ?? null as any;
    if (domainEntity.id_producto !== undefined) ormEntity.id_producto = domainEntity.id_producto;
    if (domainEntity.cantidad !== undefined) ormEntity.cantidad = domainEntity.cantidad;
    if (domainEntity.fecha_devolucion !== undefined) ormEntity.fecha_devolucion = domainEntity.fecha_devolucion ?? null;
    return ormEntity;
  }
}
