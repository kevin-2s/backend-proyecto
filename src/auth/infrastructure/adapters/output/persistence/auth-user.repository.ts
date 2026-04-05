import { AuthRepositoryPort } from '../../../../domain/ports/output/auth.repository.port';
import { AuthUser } from '../../../../domain/entities/auth-user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from '../../../../../users/infrastructure/entities/usuario.typeorm.entity';

@Injectable()
export class AuthUserRepositoryAdapter implements AuthRepositoryPort {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async findUserByEmail(correo: string): Promise<AuthUser | null> {
    const usuario = await this.usuarioRepository.findOne({
      where: { correo },
      relations: ['rol'],
    });

    if (!usuario) return null;

    return new AuthUser(
      String(usuario.id),
      usuario.correo,
      usuario.contrasena,
      [usuario.rol.nombreRol],
    );
  }
}
