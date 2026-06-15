import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsignacionOrmEntity } from './entities/asignacion.orm-entity';
import { ItemOrmEntity } from '../../items/infrastructure/entities/item.orm-entity';
import { AsignacionesController } from './adapters/input/http/asignaciones.controller';
import { AsignacionesService } from '../application/services/asignaciones.service';
import { AsignacionesRepositoryAdapter } from './adapters/output/persistence/asignaciones.repository';
import { ASIGNACIONES_USE_CASES } from '../domain/ports/input/asignaciones-use-cases.interface';
import { ASIGNACIONES_REPOSITORY } from '../domain/ports/output/asignaciones-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([AsignacionOrmEntity, ItemOrmEntity])],
  controllers: [AsignacionesController],
  providers: [
    { provide: ASIGNACIONES_USE_CASES, useClass: AsignacionesService },
    { provide: ASIGNACIONES_REPOSITORY, useClass: AsignacionesRepositoryAdapter },
  ],
  exports: [ASIGNACIONES_USE_CASES, ASIGNACIONES_REPOSITORY],
})
export class AsignacionesModule {}
