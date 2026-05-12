import { Categoria } from '../../domain/entities/categoria.domain.entity';
import { CategoriaOrmEntity } from '../entities/categoria.orm-entity';

export class CategoriaMapper {
  static toDomain(ormEntity: CategoriaOrmEntity): Categoria {
    return new Categoria(ormEntity.id_categoria, ormEntity.nombre);
  }

  static toEntity(domainEntity: Partial<Categoria>): CategoriaOrmEntity {
    const ormEntity = new CategoriaOrmEntity();
    if (domainEntity.id_categoria !== undefined) {
      ormEntity.id_categoria = domainEntity.id_categoria;
    }
    if (domainEntity.nombre !== undefined) {
      ormEntity.nombre = domainEntity.nombre;
    }
    return ormEntity;
  }
}
