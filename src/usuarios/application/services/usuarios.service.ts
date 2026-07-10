import { Injectable, Inject } from '@nestjs/common';
import { IUsuariosUseCases } from '../../domain/ports/input/usuarios-use-cases.interface';
import { IUsuariosRepository, USUARIOS_REPOSITORY } from '../../domain/ports/output/usuarios-repository.interface';
import { Usuario } from '../../domain/entities/usuario.domain.entity';
import { UsuarioNotFoundException } from '../../domain/exceptions/usuario-not-found.exception';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';

@Injectable()
export class UsuariosService implements IUsuariosUseCases {
  constructor(
    @Inject(USUARIOS_REPOSITORY)
    private readonly usuariosRepository: IUsuariosRepository,
    private readonly dataSource: DataSource,
  ) {}

  async obtenerUsuarios(): Promise<Usuario[]> {
    return this.usuariosRepository.findAll();
  }

  async obtenerUsuarioPorId(id: number): Promise<Usuario> {
    const usuario = await this.usuariosRepository.findById(id);
    if (!usuario) {
      throw new UsuarioNotFoundException(id);
    }
    return usuario;
  }

  async crearUsuario(data: { nombre: string; correo: string; telefono?: string; documento?: string; password: string; id_rol: number }): Promise<Usuario> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    const usuario = await this.usuariosRepository.create({ ...data, password: hashedPassword });

    try {
      if (usuario && usuario.id_usuario && data.id_rol) {
        // Query permissions associated with this role in rol_permisos table
        const rolPermisos = await this.dataSource.query(
          `SELECT id_permiso FROM rol_permisos WHERE id_rol = $1`,
          [data.id_rol]
        );

        // Copy them to usuario_permisos as active by default
        for (const rp of rolPermisos) {
          const exists = await this.dataSource.query(
            `SELECT id FROM usuario_permisos WHERE id_usuario = $1 AND id_permiso = $2`,
            [usuario.id_usuario, rp.id_permiso]
          );
          if (exists.length === 0) {
            await this.dataSource.query(
              `INSERT INTO usuario_permisos (id_usuario, id_permiso, activo) VALUES ($1, $2, $3)`,
              [usuario.id_usuario, rp.id_permiso, true]
            );
          }
        }
      }
    } catch (error) {
      console.error('Error copying default role permissions to user:', error);
    }

    return usuario;
  }

  async eliminarUsuario(id: number): Promise<void> {
    // Verify user exists before deletion
    await this.obtenerUsuarioPorId(id);

    // Check if the user is the primary administrator of any Sede
    const isSedeAdmin = await this.dataSource.query(
      `SELECT id_sede FROM sede WHERE id_administrador = $1 LIMIT 1`,
      [id]
    );

    if (isSedeAdmin && isSedeAdmin.length > 0) {
      throw new Error('No se puede eliminar el usuario porque es el administrador principal de una sede');
    }

    await this.usuariosRepository.delete(id);
  }

  async actualizarUsuario(id: number, data: Partial<{ nombre: string; correo: string; telefono?: string; documento?: string; password: string; estado: boolean; id_rol: number }>): Promise<Usuario> {
    const existingUser = await this.obtenerUsuarioPorId(id); // Verifica si existe
    if (data.password) {
      const saltRounds = 10;
      data.password = await bcrypt.hash(data.password, saltRounds);
    }
    const updated = await this.usuariosRepository.update(id, data);

    try {
      // If the role was changed during update, sync default permissions for the new role
      if (data.id_rol && Number(data.id_rol) !== Number(existingUser.id_rol)) {
        // Delete existing permissions for the user
        await this.dataSource.query(
          `DELETE FROM usuario_permisos WHERE id_usuario = $1`,
          [id]
        );

        // Query permissions for the new role
        const rolPermisos = await this.dataSource.query(
          `SELECT id_permiso FROM rol_permisos WHERE id_rol = $1`,
          [data.id_rol]
        );

        // Assign default permissions for the new role
        for (const rp of rolPermisos) {
          await this.dataSource.query(
            `INSERT INTO usuario_permisos (id_usuario, id_permiso, activo) VALUES ($1, $2, $3)`,
            [id, rp.id_permiso, true]
          );
        }
      }
    } catch (error) {
      console.error('Error updating default permissions for user role change:', error);
    }

    return updated;
  }
}
