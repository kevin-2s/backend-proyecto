import { AuthRepositoryPort } from '../../../../domain/ports/output/auth.repository.port';
import { AuthUser } from '../../../../domain/entities/auth-user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioOrmEntity } from '../../../../../usuarios/infrastructure/entities/usuario.orm-entity';

@Injectable()
export class AuthUserRepositoryAdapter implements AuthRepositoryPort {
  constructor(
    @InjectRepository(UsuarioOrmEntity)
    private readonly usuarioRepository: Repository<UsuarioOrmEntity>,
  ) {}

  async findUserByEmail(correo: string): Promise<AuthUser | null> {
    const usuario = await this.usuarioRepository.findOne({
      where: { correo },
      relations: ['rol'],
    });

    if (!usuario) return null;

    return new AuthUser(
      String(usuario.id_usuario),
      usuario.correo,
      usuario.password,
      [usuario.rol.nombre],
    );
  }
}
