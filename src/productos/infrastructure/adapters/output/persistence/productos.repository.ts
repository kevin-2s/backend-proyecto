import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IProductosRepository } from '../../../../domain/ports/output/productos-repository.interface';
import { ProductoOrmEntity } from '../../../entities/producto.orm-entity';
import { ProductoMapper } from '../../../mappers/producto.mapper';
import { Producto } from '../../../../domain/entities/producto.domain.entity';

@Injectable()
export class ProductosRepositoryAdapter implements IProductosRepository {
  constructor(
    @InjectRepository(ProductoOrmEntity)
    private readonly repository: Repository<ProductoOrmEntity>,
  ) {}

  async findAll(): Promise<Producto[]> {
    const productosOrm = await this.repository.find({ relations: ['categoria'] });
    return productosOrm.map(ProductoMapper.toDomain);
  }

  async findById(id: number): Promise<Producto | null> {
    const productoEntity = await this.repository.findOne({ where: { id_producto: id }, relations: ['categoria'] });
    if (!productoEntity) return null;
    return ProductoMapper.toDomain(productoEntity);
  }

  async create(productoData: Omit<Producto, 'id_producto' | 'categoria'>): Promise<Producto> {
    const ormEntity = ProductoMapper.toEntity(productoData);
    const saved = await this.repository.save(ormEntity);
    return ProductoMapper.toDomain(saved);
  }

  async update(id: number, productoData: Partial<Omit<Producto, 'id_producto' | 'categoria'>>): Promise<Producto> {
    await this.repository.update(id, productoData);
    return this.findById(id) as Promise<Producto>;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
