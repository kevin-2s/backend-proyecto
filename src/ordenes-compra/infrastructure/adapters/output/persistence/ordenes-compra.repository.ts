import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdenCompraOrmEntity } from '../../../entities/orden-compra.orm-entity';
import { OrdenCompraDomainEntity } from '../../../../domain/entities/orden-compra.domain.entity';
import { OrdenesCompraRepositoryInterface } from '../../../../domain/ports/output/ordenes-compra-repository.interface';
import { OrdenCompraMapper } from '../../../mappers/orden-compra.mapper';

@Injectable()
export class OrdenesCompraRepository implements OrdenesCompraRepositoryInterface {
  constructor(
    @InjectRepository(OrdenCompraOrmEntity)
    private readonly ormRepository: Repository<OrdenCompraOrmEntity>,
  ) {}

  async create(orden: OrdenCompraDomainEntity): Promise<OrdenCompraDomainEntity> {
    const ormEntity = OrdenCompraMapper.toOrmEntity(orden);
    const savedEntity = await this.ormRepository.save(ormEntity);
    return OrdenCompraMapper.toDomainEntity(savedEntity);
  }

  async findAll(): Promise<OrdenCompraDomainEntity[]> {
    const ormEntities = await this.ormRepository.find({ relations: ['proveedor', 'item'] });
    return ormEntities.map((entity) => OrdenCompraMapper.toDomainEntity(entity));
  }

  async findById(id: number): Promise<OrdenCompraDomainEntity | null> {
    const ormEntity = await this.ormRepository.findOne({ 
        where: { id_orden: id },
        relations: ['proveedor', 'item']
    });
    if (!ormEntity) return null;
    return OrdenCompraMapper.toDomainEntity(ormEntity);
  }

  async update(id: number, orden: Partial<OrdenCompraDomainEntity>): Promise<OrdenCompraDomainEntity | null> {
    await this.ormRepository.update(id, orden);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.ormRepository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }
}
