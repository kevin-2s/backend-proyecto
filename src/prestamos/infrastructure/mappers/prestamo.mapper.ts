import { PrestamoDomainEntity } from '../../domain/entities/prestamo.domain.entity';
import { PrestamoOrmEntity } from '../entities/prestamo.orm-entity';

export class PrestamoMapper {
  static toDomainEntity(orm: PrestamoOrmEntity): PrestamoDomainEntity {
    const domain = new PrestamoDomainEntity();
    domain.id_prestamo = orm.id_prestamo;
    domain.id_item = orm.id_item;
    domain.id_usuario = orm.id_usuario;
    domain.id_ficha = orm.id_ficha;
    domain.fecha_prestamo = orm.fecha_prestamo;
    domain.fecha_devolucion_esperada = orm.fecha_devolucion_esperada;
    domain.fecha_devolucion_real = orm.fecha_devolucion_real;
    domain.estado = orm.estado;
    domain.estado_devolucion = orm.estado_devolucion;
    domain.observacion = orm.observacion;
    domain.observacion_devolucion = orm.observacion_devolucion;
    // Enrich with relations
    (domain as any).item = orm.item;
    (domain as any).usuario = orm.usuario;
    return domain;
  }

  static toOrmEntity(domain: PrestamoDomainEntity): PrestamoOrmEntity {
    const orm = new PrestamoOrmEntity();
    if (domain.id_prestamo) orm.id_prestamo = domain.id_prestamo;
    orm.id_item = domain.id_item;
    orm.id_usuario = domain.id_usuario;
    if (domain.id_ficha) orm.id_ficha = domain.id_ficha;
    if (domain.fecha_devolucion_esperada) orm.fecha_devolucion_esperada = domain.fecha_devolucion_esperada;
    if (domain.fecha_devolucion_real) orm.fecha_devolucion_real = domain.fecha_devolucion_real;
    if (domain.estado) orm.estado = domain.estado;
    if (domain.estado_devolucion) orm.estado_devolucion = domain.estado_devolucion;
    if (domain.observacion !== undefined) orm.observacion = domain.observacion;
    if (domain.observacion_devolucion !== undefined) orm.observacion_devolucion = domain.observacion_devolucion;
    return orm;
  }
}
