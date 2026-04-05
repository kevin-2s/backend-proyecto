import { Devolucion } from '../../domain/entities/devolucion.entity';
import { DevolucionEntity } from '../entities/devolucion.typeorm.entity';
import { EstadoFisico } from '../../../shared/domain/enums';

export class DevolucionMapper {
    static toDomain(entity: DevolucionEntity): Devolucion {
        return new Devolucion(String(entity.id), '', 1, '', entity.fechaReal || new Date(), entity.fechaReal || new Date());
    }
    static toEntity(domain: Devolucion): DevolucionEntity {
        const entity = new DevolucionEntity();
        if (domain.id && !isNaN(Number(domain.id))) entity.id = Number(domain.id);
        entity.estadoFisico = EstadoFisico.BUENO;
        entity.fechaReal = domain.createdAt || new Date();
        entity.observaciones = '';
        return entity;
    }
}
