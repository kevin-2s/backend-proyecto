import { Asigna } from '../../domain/entities/asigna.entity';
import { AsignaEntity } from '../entities/asigna.typeorm.entity';
import { EstadoFisico, EstadoSolicitud } from '../../../shared/domain/enums';

export class AsignaMapper {
    static toDomain(entity: AsignaEntity): Asigna {
        return new Asigna(String(entity.id), '', '', entity.fechaEnt ? 1 : 0, entity.fechaEnt || new Date(), entity.fechaDevolucionEst || new Date());
    }
    static toEntity(domain: Asigna): AsignaEntity {
        const entity = new AsignaEntity();
        if (domain.id && !isNaN(Number(domain.id))) entity.id = Number(domain.id);
        entity.estadoFisico = EstadoFisico.BUENO;
        entity.estadoEntrega = EstadoSolicitud.PENDIENTE;
        entity.fechaEnt = domain.createdAt || new Date();
        return entity;
    }
}
