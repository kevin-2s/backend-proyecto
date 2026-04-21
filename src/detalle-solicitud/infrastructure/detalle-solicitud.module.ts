import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleSolicitudOrmEntity } from './entities/detalle-solicitud.orm-entity';
import { DetalleSolicitudController } from './adapters/input/http/detalle-solicitud.controller';
import { DetalleSolicitudService } from '../application/services/detalle-solicitud.service';
import { DetalleSolicitudRepositoryAdapter } from './adapters/output/persistence/detalle-solicitud.repository';
import { DETALLE_SOLICITUD_USE_CASES } from '../domain/ports/input/detalle-solicitud-use-cases.interface';
import { DETALLE_SOLICITUD_REPOSITORY } from '../domain/ports/output/detalle-solicitud-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleSolicitudOrmEntity])],
  controllers: [DetalleSolicitudController],
  providers: [
    {
      provide: DETALLE_SOLICITUD_USE_CASES,
      useClass: DetalleSolicitudService,
    },
    {
      provide: DETALLE_SOLICITUD_REPOSITORY,
      useClass: DetalleSolicitudRepositoryAdapter,
    },
  ],
  exports: [DETALLE_SOLICITUD_USE_CASES, DETALLE_SOLICITUD_REPOSITORY],
})
export class DetalleSolicitudModule {}
