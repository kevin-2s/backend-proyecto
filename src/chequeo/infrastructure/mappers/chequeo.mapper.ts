import { Chequeo } from '../../domain/entities/chequeo.entity';
import { ChequeoEntity } from '../entities/chequeo.typeorm.entity';

export class ChequeoMapper {
  static toDomain(entity: ChequeoEntity): Chequeo {
    return new Chequeo(
      Number(entity.id),
      entity.fechaChequeo || new Date(),
      Boolean(entity.confirmado),
      entity.asigna ? Number(entity.asigna.id) : (entity as any).asignaId || null,
      entity.devolucion ? Number(entity.devolucion.id) : (entity as any).devolucionId || null,
      entity.usuario ? Number(entity.usuario.id) : (entity as any).usuarioId || 0,
    );
  }

  static toEntity(domain: Chequeo): ChequeoEntity {
    const entity = new ChequeoEntity();
    if (domain.id && !isNaN(Number(domain.id))) entity.id = Number(domain.id);
    entity.fechaChequeo = domain.fechaChequeo || new Date();
    entity.confirmado = domain.confirmado ?? false;
    (entity as any).asignaId = domain.asignaId || null;
    (entity as any).devolucionId = domain.devolucionId || null;
    (entity as any).usuarioId = domain.usuarioId;
    return entity;
  }
}