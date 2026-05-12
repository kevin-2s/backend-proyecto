import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioOrmEntity } from './entities/usuario.orm-entity';
import { UsuariosController } from './adapters/input/http/usuarios.controller';
import { UsuariosService } from '../application/services/usuarios.service';
import { UsuariosRepositoryAdapter } from './adapters/output/persistence/usuarios.repository';
import { USUARIOS_USE_CASES } from '../domain/ports/input/usuarios-use-cases.interface';
import { USUARIOS_REPOSITORY } from '../domain/ports/output/usuarios-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioOrmEntity])],
  controllers: [UsuariosController],
  providers: [
    {
      provide: USUARIOS_USE_CASES,
      useClass: UsuariosService,
    },
    {
      provide: USUARIOS_REPOSITORY,
      useClass: UsuariosRepositoryAdapter,
    },
  ],
  exports: [USUARIOS_USE_CASES, USUARIOS_REPOSITORY],
})
export class UsuariosModule {}
