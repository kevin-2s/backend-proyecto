import { Asignacion } from '../../domain/entities/asignacion.domain.entity';
import { AsignacionOrmEntity } from '../entities/asignacion.orm-entity';
import { FichaMapper } from '../../../fichas/infrastructure/mappers/ficha.mapper';
import { ProductoMapper } from '../../../productos/infrastructure/mappers/producto.mapper';
import { UsuarioMapper } from '../../../usuarios/infrastructure/mappers/usuario.mapper';

export class AsignacionMapper {
  static toDomain(orm: AsignacionOrmEntity): Asignacion {
    return new Asignacion(
      orm.id_asignacion,
      orm.id_ficha,
      orm.id_producto,
      orm.cantidad,
      orm.fecha_asignacion,
      orm.id_usuario_asigna,
      orm.observacion,
      orm.estado,
      orm.ficha ? FichaMapper.toDomain(orm.ficha) : undefined,
      orm.producto ? ProductoMapper.toDomain(orm.producto) : undefined,
      orm.usuario_asigna ? UsuarioMapper.toDomain(orm.usuario_asigna) : undefined,
    );
  }

  static toEntity(domain: Partial<Asignacion>): AsignacionOrmEntity {
    const orm = new AsignacionOrmEntity();
    if (domain.id_asignacion !== undefined) orm.id_asignacion = domain.id_asignacion;
    if (domain.id_ficha !== undefined) orm.id_ficha = domain.id_ficha;
    if (domain.id_producto !== undefined) orm.id_producto = domain.id_producto;
    if (domain.cantidad !== undefined) orm.cantidad = domain.cantidad;
    if (domain.fecha_asignacion !== undefined) orm.fecha_asignacion = domain.fecha_asignacion;
    if (domain.id_usuario_asigna !== undefined) orm.id_usuario_asigna = domain.id_usuario_asigna;
    if (domain.observacion !== undefined) orm.observacion = domain.observacion ?? null;
    if (domain.estado !== undefined) orm.estado = domain.estado;
    return orm;
  }
}
