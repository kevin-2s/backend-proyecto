import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UsuarioEntity } from '../../../users/infrastructure/entities/usuario.typeorm.entity';

@Entity('roles')
export class RoleEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ name: 'nombre_rol', type: 'varchar' })
  nombreRol!: string;

  @OneToMany(() => UsuarioEntity, (usuario) => usuario.rol)
  usuarios!: UsuarioEntity[];
}
