import { Sitio } from '../../domain/entities/sitio.entity';
import { SitioEntity } from '../entities/sitio.typeorm.entity';

export class SitioMapper {
    static toDomain(entity: SitioEntity): Sitio {
        return new Sitio(
            entity.id,
            entity.nombre,
            entity.tipoSitio,
            entity.capacidad,
            entity.createdAt,
            entity.updatedAt
        );
    }

    static toEntity(domain: Sitio): SitioEntity {
        const entity = new SitioEntity();
        if (domain.id) entity.id = domain.id;
        entity.nombre = domain.nombre;
        entity.tipoSitio = domain.tipoSitio;
        entity.capacidad = domain.capacidad;
        return entity;
    }
}
