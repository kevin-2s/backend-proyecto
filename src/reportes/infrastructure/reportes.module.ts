import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportesController } from './adapters/input/http/reportes.controller';
import { ReportesService } from '../application/services/reportes.service';
import { ReportesRepositoryAdapter } from './adapters/output/persistence/reportes.repository';
import { REPORTES_REPOSITORY } from '../domain/ports/output/reportes-repository.interface';
import { InventarioOrmEntity } from '../../inventario/infrastructure/entities/inventario.orm-entity';
import { SolicitudOrmEntity } from '../../solicitudes/infrastructure/entities/solicitud.orm-entity';
import { KardexOrmEntity } from '../../kardex/infrastructure/entities/kardex.orm-entity';
import { UsuarioOrmEntity } from '../../usuarios/infrastructure/entities/usuario.orm-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InventarioOrmEntity,
      SolicitudOrmEntity,
      KardexOrmEntity,
      UsuarioOrmEntity,
    ]),
  ],
  controllers: [ReportesController],
  providers: [
    ReportesService,
    {
      provide: REPORTES_REPOSITORY,
      useClass: ReportesRepositoryAdapter,
    },
  ],
  exports: [ReportesService],
})
export class ReportesModule {}
