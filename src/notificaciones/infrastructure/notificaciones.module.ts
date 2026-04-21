import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificacionOrmEntity } from './entities/notificacion.orm-entity';
import { NotificacionesController } from './adapters/input/http/notificaciones.controller';
import { NotificacionesService } from '../application/services/notificaciones.service';
import { NotificacionesRepositoryAdapter } from './adapters/output/persistence/notificaciones.repository';
import { NOTIFICACIONES_USE_CASES } from '../domain/ports/input/notificaciones-use-cases.interface';
import { NOTIFICACIONES_REPOSITORY } from '../domain/ports/output/notificaciones-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([NotificacionOrmEntity])],
  controllers: [NotificacionesController],
  providers: [
    {
      provide: NOTIFICACIONES_USE_CASES,
      useClass: NotificacionesService,
    },
    {
      provide: NOTIFICACIONES_REPOSITORY,
      useClass: NotificacionesRepositoryAdapter,
    },
  ],
  exports: [NOTIFICACIONES_USE_CASES, NOTIFICACIONES_REPOSITORY],
})
export class NotificacionesModule {}
