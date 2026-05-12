import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UsuarioOrmEntity } from '../../../usuarios/infrastructure/entities/usuario.orm-entity';

@Entity('ficha')
export class FichaOrmEntity {
  @PrimaryGeneratedColumn()
  id_ficha: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  numero_ficha: string;

  @Column({ type: 'varchar', length: 150 })
  programa: string;

  @Column({ nullable: true })
  id_responsable: number;

  @ManyToOne(() => UsuarioOrmEntity, { nullable: true })
  @JoinColumn({ name: 'id_responsable' })
  responsable: UsuarioOrmEntity;
}
