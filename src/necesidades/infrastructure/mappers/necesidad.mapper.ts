import { Necesidad } from '../../domain/entities/necesidad.entity';
import { NecesidadEntity } from '../entities/necesidad.typeorm.entity';

export class NecesidadMapper {
  static toDomain(entity: NecesidadEntity): Necesidad {
    return new Necesidad(
      Number(entity.id),
      entity.cantidadN || 0,
      entity.fechaLimite || null,
      entity.usuario ? Number(entity.usuario.id) : (entity as any).usuarioId || 0,
      entity.producto ? Number(entity.producto.id) : (entity as any).productoId || 0,
      entity.ficha ? Number(entity.ficha.id) : (entity as any).fichaId || 0,
    );
  }

  static toEntity(domain: Necesidad): NecesidadEntity {
    const entity = new NecesidadEntity();
    if (domain.id && !isNaN(Number(domain.id))) entity.id = Number(domain.id);
    entity.cantidadN = domain.cantidadN || 0;
    entity.fechaLimite = domain.fechaLimite || null;
    (entity as any).usuarioId = domain.usuarioId;
    (entity as any).productoId = domain.productoId;
    (entity as any).fichaId = domain.fichaId;
    return entity;
  }
}