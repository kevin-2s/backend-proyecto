import { Sitio } from '../../domain/entities/sitio.entity';
import { SitioEntity } from '../entities/sitio.typeorm.entity';
import { TipoSitio } from '../../../shared/domain/enums';

export class SitioMapper {
    static toDomain(entity: SitioEntity): Sitio {
        return new Sitio(String(entity.id), entity.nombreSitio, String(entity.tipo), 0, new Date(), new Date());
    }
    static toEntity(domain: Sitio): SitioEntity {
        const entity = new SitioEntity();
        if (domain.id && !isNaN(Number(domain.id))) entity.id = Number(domain.id);
        entity.nombreSitio = domain.nombre || '';
        entity.tipo = TipoSitio.BODEGA;
        return entity;
    }
}
