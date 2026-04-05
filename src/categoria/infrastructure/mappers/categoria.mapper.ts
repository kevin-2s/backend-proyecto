import { Categoria } from '../../domain/entities/categoria.entity';
import { CategoriaEntity } from '../entities/categoria.typeorm.entity';

export class CategoriaMapper {
    static toDomain(entity: CategoriaEntity): Categoria {
        return new Categoria(
            Number(entity.id),
            entity.nombreCat
        );
    }
    static toEntity(domain: any): CategoriaEntity {
        const entity = new CategoriaEntity();
        if (domain.id && !isNaN(Number(domain.id))) entity.id = Number(domain.id);
        entity.nombreCat = domain.nombreCat || '';
        return entity;
    }
}
