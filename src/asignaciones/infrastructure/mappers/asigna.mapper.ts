import { Asigna } from '../../domain/entities/asigna.entity';
import { AsignaEntity } from '../entities/asigna.typeorm.entity';
import { EstadoFisico, EstadoSolicitud } from '../../../shared/domain/enums';

export class AsignaMapper {
  static toDomain(entity: AsignaEntity): Asigna {
    return new Asigna(
      Number(entity.id),
      String(entity.estadoFisico),
      String(entity.estadoEntrega),
      entity.fechaEnt || new Date(),
      entity.fechaDevolucionEst || null,
      entity.observaciones || '',
      entity.producto ? Number(entity.producto.id) : (entity as any).productoId || 0,
      entity.usuario ? Number(entity.usuario.id) : (entity as any).usuarioId || 0,
      entity.ficha ? Number(entity.ficha.id) : (entity as any).fichaId || 0,
    );
  }

  static toEntity(domain: Asigna): AsignaEntity {
    const entity = new AsignaEntity();
    if (domain.id && !isNaN(Number(domain.id))) entity.id = Number(domain.id);
    entity.estadoFisico = domain.estadoFisico as EstadoFisico;
    entity.estadoEntrega = domain.estadoEntrega as EstadoSolicitud;
    entity.fechaEnt = domain.fechaEnt || new Date();
    entity.fechaDevolucionEst = domain.fechaDevolucionEst || null;
    entity.observaciones = domain.observaciones || '';
    (entity as any).productoId = domain.productoId;
    (entity as any).usuarioId = domain.usuarioId;
    (entity as any).fichaId = domain.fichaId || null;
    return entity;
  }
}