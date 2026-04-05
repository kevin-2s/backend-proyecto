import { Categoria } from '../../domain/entities/categoria.entity';
import { CategoriaEntity } from '../entities/categoria.typeorm.entity';

export class CategoriaMapper {
    static toDomain(entity: CategoriaEntity): Categoria {
        return new Categoria(String(entity.id), entity.nombreCat, '', new Date(), new Date());
    }
    static toEntity(domain: Categoria): CategoriaEntity {
        const entity = new CategoriaEntity();
        if (domain.id && !isNaN(Number(domain.id))) entity.id = Number(domain.id);
        entity.nombreCat = domain.nombre || '';
        return entity;
    }
}
