import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductoEntity } from '../../../productos/infrastructure/entities/producto.typeorm.entity';

@Entity('categorias')
export class CategoriaEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ name: 'nombre_cat', type: 'varchar' })
  nombreCat!: string;

  @OneToMany(() => ProductoEntity, (producto) => producto.categoria)
  productos!: ProductoEntity[];
}
