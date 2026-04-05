import { Devolucion } from '../../domain/entities/devolucion.entity';
import { DevolucionEntity } from '../entities/devolucion.typeorm.entity';
import { EstadoFisico } from '../../../shared/domain/enums';

export class DevolucionMapper {
  static toDomain(entity: DevolucionEntity): Devolucion {
    return new Devolucion(
      Number(entity.id),
      String(entity.estadoFisico || 'BUENO'),
      entity.fechaReal || new Date(),
      entity.observaciones || '',
      entity.asigna ? Number(entity.asigna.id) : (entity as any).asignaId || 0,
      entity.producto ? Number(entity.producto.id) : (entity as any).productoId || 0,
      entity.movimiento ? Number(entity.movimiento.id) : (entity as any).movimientoId || 0,
    );
  }

  static toEntity(domain: Devolucion): DevolucionEntity {
    const entity = new DevolucionEntity();
    if (domain.id && !isNaN(Number(domain.id))) entity.id = Number(domain.id);
    entity.estadoFisico = domain.estadoFisico as EstadoFisico;
    entity.fechaReal = domain.fechaReal || new Date();
    entity.observaciones = domain.observaciones || '';
    (entity as any).asignaId = domain.asignaId;
    (entity as any).productoId = domain.productoId;
    (entity as any).movimientoId = domain.movimientoId;
    return entity;
  }
}