import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/infrastructure/auth.module';
import { UsuarioPermisoOrmEntity } from './infrastructure/entities/usuario-permiso.orm-entity';
import { UsuarioPermisosController } from './infrastructure/adapters/input/http/usuario-permisos.controller';
import { UsuarioPermisosService } from './application/use-cases/usuario-permisos.service';
import { UsuarioPermisosRepository } from './infrastructure/adapters/output/persistence/usuario-permisos.repository';
import { IUsuarioPermisosUseCases } from './application/ports/input/usuario-permisos.use-cases.interface';
import { IUsuarioPermisosRepository } from './application/ports/output/usuario-permisos.repository.interface';
import { PermisosModule } from '../permisos/permisos.module';
import { UsuariosModule } from '../usuarios/infrastructure/usuarios.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioPermisoOrmEntity]),
    PermisosModule,
    UsuariosModule,
    AuthModule,
  ],
  controllers: [UsuarioPermisosController],
  providers: [
    {
      provide: IUsuarioPermisosUseCases,
      useClass: UsuarioPermisosService,
    },
    {
      provide: IUsuarioPermisosRepository,
      useClass: UsuarioPermisosRepository,
    },
  ],
  exports: [IUsuarioPermisosUseCases, IUsuarioPermisosRepository],
})
export class UsuarioPermisosModule {}
