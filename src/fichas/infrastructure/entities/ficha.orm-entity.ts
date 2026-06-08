import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UsuarioOrmEntity } from '../../../usuarios/infrastructure/entities/usuario.orm-entity';
import { ProgramaOrmEntity } from '../../../programas/infrastructure/entities/programa.orm-entity';

@Entity('ficha')
export class FichaOrmEntity {
  @PrimaryGeneratedColumn()
  id_ficha: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  numero_ficha: string;

  @Column({ nullable: false })
  id_programa: number;

  @ManyToOne(() => ProgramaOrmEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_programa' })
  programa: ProgramaOrmEntity;

  @Column({ nullable: true })
  id_responsable: number;

  @ManyToOne(() => UsuarioOrmEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'id_responsable' })
  responsable: UsuarioOrmEntity;

  @Column({ type: 'varchar', length: 50, nullable: true })
  ambiente: string;

  @Column({ type: 'boolean', default: true })
  estado: boolean;
}
