import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrasladoOrmEntity } from './entities/traslado.orm-entity';
import { ItemOrmEntity } from '../../items/infrastructure/entities/item.orm-entity';
import { SitioOrmEntity } from '../../sitios/infrastructure/entities/sitio.orm-entity';
import { NotificacionOrmEntity } from '../../notificaciones/infrastructure/entities/notificacion.orm-entity';
import { TrasladosController } from './adapters/input/http/traslados.controller';
import { TrasladosService } from '../application/services/traslados.service';
import { TrasladosRepositoryAdapter } from './adapters/output/persistence/traslados.repository';
import { TRASLADOS_USE_CASES } from '../domain/ports/input/traslados-use-cases.interface';
import { TRASLADOS_REPOSITORY } from '../domain/ports/output/traslados-repository.interface';
import { NotificacionesModule } from '../../notificaciones/infrastructure/notificaciones.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrasladoOrmEntity, ItemOrmEntity, SitioOrmEntity, NotificacionOrmEntity]),
    NotificacionesModule,
  ],
  controllers: [TrasladosController],
  providers: [
    { provide: TRASLADOS_USE_CASES, useClass: TrasladosService },
    { provide: TRASLADOS_REPOSITORY, useClass: TrasladosRepositoryAdapter },
  ],
  exports: [TRASLADOS_USE_CASES, TRASLADOS_REPOSITORY],
})
export class TrasladosModule {}
