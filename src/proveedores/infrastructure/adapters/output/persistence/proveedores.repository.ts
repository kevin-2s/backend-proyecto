import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProveedorOrmEntity } from '../../../entities/proveedor.orm-entity';
import { ProveedorDomainEntity } from '../../../../domain/entities/proveedor.domain.entity';
import { ProveedoresRepositoryInterface } from '../../../../domain/ports/output/proveedores-repository.interface';
import { ProveedorMapper } from '../../../mappers/proveedor.mapper';

@Injectable()
export class ProveedoresRepository implements ProveedoresRepositoryInterface {
  constructor(
    @InjectRepository(ProveedorOrmEntity)
    private readonly ormRepository: Repository<ProveedorOrmEntity>,
  ) {}

  async create(proveedor: ProveedorDomainEntity): Promise<ProveedorDomainEntity> {
    const ormEntity = ProveedorMapper.toOrmEntity(proveedor);
    const savedEntity = await this.ormRepository.save(ormEntity);
    return ProveedorMapper.toDomainEntity(savedEntity);
  }

  async findAll(): Promise<ProveedorDomainEntity[]> {
    const ormEntities = await this.ormRepository.find();
    return ormEntities.map((entity) => ProveedorMapper.toDomainEntity(entity));
  }

  async findById(id: number): Promise<ProveedorDomainEntity | null> {
    const ormEntity = await this.ormRepository.findOne({ where: { id_proveedor: id } });
    if (!ormEntity) return null;
    return ProveedorMapper.toDomainEntity(ormEntity);
  }

  async update(id: number, proveedor: Partial<ProveedorDomainEntity>): Promise<ProveedorDomainEntity | null> {
    await this.ormRepository.update(id, proveedor);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.ormRepository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }
}
