import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { CategoriaOrmEntity } from '../../../categorias/infrastructure/entities/categoria.orm-entity';
import { TenantOrmEntity } from '../../../shared/tenancy/tenant.orm-entity';

@Entity('producto')
@Unique(['tenant_id', 'SKU'])
export class ProductoOrmEntity extends TenantOrmEntity {
  @PrimaryGeneratedColumn()
  id_producto: number;

  @Column({ type: 'varchar', length: 150 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  codigo_unspsc: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  SKU: string | null;

  @Column({ type: 'varchar', length: 50 })
  tipo_material: string;

  @Column({ type: 'varchar', length: 50 })
  unidad_medida: string;

  @Column({ type: 'boolean', default: false })
  es_psd: boolean;

  @Column({ type: 'date', nullable: true })
  fecha_vencimiento: Date | null;

  @Column()
  id_categoria: number;

  @Column({ type: 'int', default: 0 })
  stock_minimo: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  unidad_peso_bulto: string | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  peso_por_bulto: number | null;

  @Column({ type: 'int', nullable: true })
  id_sitio: number | null;

  @ManyToOne(() => CategoriaOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_categoria' })
  categoria: CategoriaOrmEntity;
}
