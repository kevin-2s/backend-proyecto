import { Novedad } from '../../domain/entities/novedad.domain.entity';
import { NovedadOrmEntity } from '../entities/novedad.orm-entity';
import { ItemMapper } from '../../../items/infrastructure/mappers/item.mapper';
import { UsuarioMapper } from '../../../usuarios/infrastructure/mappers/usuario.mapper';

export class NovedadMapper {
  static toDomain(orm: NovedadOrmEntity): Novedad {
    return new Novedad(
      orm.id_novedad,
      orm.tipo,
      orm.descripcion,
      orm.estado,
      orm.fecha,
      orm.id_usuario,
      orm.id_item,
      orm.item ? ItemMapper.toDomain(orm.item) : undefined,
      orm.usuario ? UsuarioMapper.toDomain(orm.usuario) : undefined,
    );
  }

  static toEntity(domain: Partial<Novedad>): NovedadOrmEntity {
    const orm = new NovedadOrmEntity();
    if (domain.id_novedad !== undefined) orm.id_novedad = domain.id_novedad;
    if (domain.tipo !== undefined) orm.tipo = domain.tipo;
    if (domain.descripcion !== undefined) orm.descripcion = domain.descripcion;
    if (domain.estado !== undefined) orm.estado = domain.estado;
    if (domain.fecha !== undefined) orm.fecha = domain.fecha;
    if (domain.id_usuario !== undefined) orm.id_usuario = domain.id_usuario;
    if (domain.id_item !== undefined) orm.id_item = domain.id_item;
    return orm;
  }
}
