import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICategoriasRepository } from '../../../../domain/ports/output/categorias-repository.interface';
import { CategoriaOrmEntity } from '../../../entities/categoria.orm-entity';
import { CategoriaMapper } from '../../../mappers/categoria.mapper';
import { Categoria } from '../../../../domain/entities/categoria.domain.entity';

@Injectable()
export class CategoriasRepositoryAdapter implements ICategoriasRepository {
  constructor(
    @InjectRepository(CategoriaOrmEntity)
    private readonly repository: Repository<CategoriaOrmEntity>,
  ) {}

  async findAll(): Promise<Categoria[]> {
    const categoriasOrm = await this.repository.find();
    return categoriasOrm.map(CategoriaMapper.toDomain);
  }

  async findById(id: number): Promise<Categoria | null> {
    const categoriaOrm = await this.repository.findOne({ where: { id_categoria: id } });
    if (!categoriaOrm) return null;
    return CategoriaMapper.toDomain(categoriaOrm);
  }

  async create(categoriaData: Omit<Categoria, 'id_categoria'>): Promise<Categoria> {
    const ormEntity = CategoriaMapper.toOrm(categoriaData);
    const saved = await this.repository.save(ormEntity);
    return CategoriaMapper.toDomain(saved);
  }
}
