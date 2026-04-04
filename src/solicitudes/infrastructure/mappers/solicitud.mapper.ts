import { Solicitud } from '../../domain/entities/solicitud.entity';
import { SolicitudEntity } from '../entities/solicitud.typeorm.entity';

export class SolicitudMapper {
    static toDomain(entity: SolicitudEntity): Solicitud {
        return new Solicitud(
            entity.id,
            entity.usuarioId,
            entity.estado,
            entity.createdAt,
            entity.updatedAt
        );
    }

    static toEntity(domain: Solicitud): SolicitudEntity {
        const entity = new SolicitudEntity();
        if (domain.id) entity.id = domain.id;
        entity.usuarioId = domain.usuarioId;
        entity.estado = domain.estado;
        return entity;
    }
}
