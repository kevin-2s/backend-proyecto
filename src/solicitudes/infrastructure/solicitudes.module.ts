import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudOrmEntity } from './entities/solicitud.orm-entity';
import { ProductoOrmEntity } from '../../productos/infrastructure/entities/producto.orm-entity';
import { SitioOrmEntity } from '../../sitios/infrastructure/entities/sitio.orm-entity';
import { NotificacionOrmEntity } from '../../notificaciones/infrastructure/entities/notificacion.orm-entity';
import { SolicitudesController } from './adapters/input/http/solicitudes.controller';
import { SolicitudesService } from '../application/services/solicitudes.service';
import { SolicitudesRepositoryAdapter } from './adapters/output/persistence/solicitudes.repository';
import { SOLICITUDES_USE_CASES } from '../domain/ports/input/solicitudes-use-cases.interface';
import { SOLICITUDES_REPOSITORY } from '../domain/ports/output/solicitudes-repository.interface';
import { NotificacionesModule } from '../../notificaciones/infrastructure/notificaciones.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SolicitudOrmEntity, ProductoOrmEntity, SitioOrmEntity, NotificacionOrmEntity]),
    NotificacionesModule,
  ],
  controllers: [SolicitudesController],
  providers: [
    { provide: SOLICITUDES_USE_CASES, useClass: SolicitudesService },
    { provide: SOLICITUDES_REPOSITORY, useClass: SolicitudesRepositoryAdapter },
  ],
  exports: [SOLICITUDES_USE_CASES, SOLICITUDES_REPOSITORY],
})
export class SolicitudesModule {}
