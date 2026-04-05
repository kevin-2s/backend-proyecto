import { Sitio } from '../../domain/entities/sitio.entity';
import { SitioEntity } from '../entities/sitio.typeorm.entity';
import { TipoSitio } from '../../../shared/domain/enums';
import { UsuarioEntity } from '../../../users/infrastructure/entities/usuario.typeorm.entity';

export class SitioMapper {
    static toDomain(entity: SitioEntity): Sitio {
        return new Sitio(
            Number(entity.id),
            entity.nombreSitio,
            String(entity.tipo),
            entity.responsable ? Number(entity.responsable.id) : 0
        );
    }
    static toEntity(domain: any): SitioEntity {
        const entity = new SitioEntity();
        if (domain.id && !isNaN(Number(domain.id))) entity.id = Number(domain.id);
        entity.nombreSitio = domain.nombreSitio || '';
        entity.tipo = domain.tipo as TipoSitio || TipoSitio.BODEGA;
        if (domain.responsableId && !isNaN(Number(domain.responsableId))) {
            entity.responsable = new UsuarioEntity();
            entity.responsable.id = Number(domain.responsableId);
        }
        return entity;
    }
}
