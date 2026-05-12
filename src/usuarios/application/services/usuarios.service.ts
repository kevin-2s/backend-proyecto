import { Injectable, Inject } from '@nestjs/common';
import { IUsuariosUseCases } from '../../domain/ports/input/usuarios-use-cases.interface';
import { IUsuariosRepository, USUARIOS_REPOSITORY } from '../../domain/ports/output/usuarios-repository.interface';
import { Usuario } from '../../domain/entities/usuario.domain.entity';
import { UsuarioNotFoundException } from '../../domain/exceptions/usuario-not-found.exception';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService implements IUsuariosUseCases {
  constructor(
    @Inject(USUARIOS_REPOSITORY)
    private readonly usuariosRepository: IUsuariosRepository,
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

  async crearUsuario(data: { nombre: string; correo: string; password: string; id_rol: number }): Promise<Usuario> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    return this.usuariosRepository.create({ ...data, password: hashedPassword });
  }

  async actualizarUsuario(id: number, data: Partial<{ nombre: string; correo: string; password: string; estado: boolean; id_rol: number }>): Promise<Usuario> {
    await this.obtenerUsuarioPorId(id); // Verifica si existe
    if (data.password) {
      const saltRounds = 10;
      data.password = await bcrypt.hash(data.password, saltRounds);
    }
    return this.usuariosRepository.update(id, data);
  }
}
