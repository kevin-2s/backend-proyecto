import { Solicitud } from '../../domain/entities/solicitud.entity';
import { SolicitudEntity } from '../entities/solicitud.typeorm.entity';
import { EstadoSolicitud } from '../../../shared/domain/enums';

export class SolicitudMapper {
    static toDomain(entity: SolicitudEntity): Solicitud {
        return new Solicitud(String(entity.id), '', String(entity.estadoSol), entity.fechaSol || new Date(), entity.fechaRespuesta || new Date());
    }
    static toEntity(domain: Solicitud): SolicitudEntity {
        const entity = new SolicitudEntity();
        if (domain.id && !isNaN(Number(domain.id))) entity.id = Number(domain.id);
        entity.estadoSol = EstadoSolicitud.PENDIENTE;
        entity.fechaSol = domain.createdAt || new Date();
        entity.justificacion = 'Justificacion generica';
        return entity;
    }
}
