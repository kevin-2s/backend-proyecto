import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CategoriaOrmEntity } from '../../../categorias/infrastructure/entities/categoria.orm-entity';
import { TipoMaterial } from '../../domain/entities/producto.domain.entity';

@Entity('producto')
export class ProductoOrmEntity {
  @PrimaryGeneratedColumn()
  id_producto: number;

  @Column({ type: 'varchar', length: 150 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string | null;

  @Column({ type: 'varchar', length: 50 })
  codigo_unspsc: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  SKU: string;

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

  @ManyToOne(() => CategoriaOrmEntity)
  @JoinColumn({ name: 'id_categoria' })
  categoria: CategoriaOrmEntity;
}
