import { Acta } from '../../domain/entities/acta.entity';
import { ActaEntity } from '../entities/acta.typeorm.entity';

export class ActaMapper {
  static toDomain(entity: ActaEntity): Acta {
    return new Acta(
      Number(entity.id),
      entity.fechaGen || new Date(),
      entity.urlPdf || '',
      entity.asigna ? Number(entity.asigna.id) : (entity as any).asignaId || null,
      entity.devolucion ? Number(entity.devolucion.id) : (entity as any).devolucionId || null,
    );
  }

  static toEntity(domain: Acta): ActaEntity {
    const entity = new ActaEntity();
    if (domain.id && !isNaN(Number(domain.id))) entity.id = Number(domain.id);
    entity.fechaGen = domain.fechaGen || new Date();
    entity.urlPdf = domain.urlPdf || '';
    (entity as any).asignaId = domain.asignaId || null;
    (entity as any).devolucionId = domain.devolucionId || null;
    return entity;
  }
}