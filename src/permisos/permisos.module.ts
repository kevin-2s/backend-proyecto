import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/infrastructure/auth.module';
import { PermisoOrmEntity } from './infrastructure/entities/permiso.orm-entity';
import { PermisosController } from './infrastructure/adapters/input/http/permisos.controller';
import { PermisosService } from './application/use-cases/permisos.service';
import { PermisosRepository } from './infrastructure/adapters/output/persistence/permisos.repository';
import { IPermisosUseCases } from './application/ports/input/permisos.use-cases.interface';
import { IPermisosRepository } from './application/ports/output/permisos.repository.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([PermisoOrmEntity]),
    AuthModule,
  ],
  controllers: [PermisosController],
  providers: [
    {
      provide: IPermisosUseCases,
      useClass: PermisosService,
    },
    {
      provide: IPermisosRepository,
      useClass: PermisosRepository,
    },
  ],
  exports: [IPermisosUseCases, IPermisosRepository],
})
export class PermisosModule {}
