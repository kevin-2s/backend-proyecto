import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { TenantOrmEntity } from '../../../shared/tenancy/tenant.orm-entity';

@Entity('categoria')
@Unique(['tenant_id', 'nombre'])
export class CategoriaOrmEntity extends TenantOrmEntity {
  @PrimaryGeneratedColumn()
  id_categoria: number;

  @Column({ type: 'varchar', length: 150 })
  nombre: string;
}
