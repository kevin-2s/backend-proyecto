import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ItemOrmEntity } from '../../../items/infrastructure/entities/item.orm-entity';
import { UsuarioOrmEntity } from '../../../usuarios/infrastructure/entities/usuario.orm-entity';
import { TipoKardex } from '../../domain/entities/kardex.domain.entity';

@Entity('kardex')
export class KardexOrmEntity {
  @PrimaryGeneratedColumn()
  id_kardex: number;

  @Column({ type: 'enum', enum: TipoKardex })
  tipo: TipoKardex;

  @Column({ type: 'int' })
  cantidad: number;

  @Column({ type: 'int' })
  saldo_anterior: number;

  @Column({ type: 'int' })
  saldo_actual: number;

  @Column({ type: 'timestamp' })
  fecha: Date;

  @Column({ type: 'text', nullable: true })
  observacion: string | null;

  @Column()
  id_item: number;

  @Column()
  id_usuario: number;

  @ManyToOne(() => ItemOrmEntity)
  @JoinColumn({ name: 'id_item' })
  item: ItemOrmEntity;

  @ManyToOne(() => UsuarioOrmEntity)
  @JoinColumn({ name: 'id_usuario' })
  usuario: UsuarioOrmEntity;
}
