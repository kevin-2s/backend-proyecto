import { Categoria } from '../../domain/entities/categoria.entity';
import { CategoriaEntity } from '../entities/categoria.typeorm.entity';

export class CategoriaMapper {
    static toDomain(entity: CategoriaEntity): Categoria {
        return new Categoria(
            entity.id,
            entity.nombre,
            entity.descripcion,
            entity.createdAt,
            entity.updatedAt
        );
    }

    static toEntity(domain: Categoria): CategoriaEntity {
        const entity = new CategoriaEntity();
        if (domain.id) entity.id = domain.id;
        entity.nombre = domain.nombre;
        entity.descripcion = domain.descripcion;
        return entity;
    }
}
