import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevolucionOrmEntity } from './entities/devolucion.orm-entity';
import { DevolucionesController } from './adapters/input/http/devoluciones.controller';
import { DevolucionesService } from '../application/services/devoluciones.service';
import { DevolucionesRepositoryAdapter } from './adapters/output/persistence/devoluciones.repository';
import { DEVOLUCIONES_USE_CASES } from '../domain/ports/input/devoluciones-use-cases.interface';
import { DEVOLUCIONES_REPOSITORY } from '../domain/ports/output/devoluciones-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([DevolucionOrmEntity])],
  controllers: [DevolucionesController],
  providers: [
    {
      provide: DEVOLUCIONES_USE_CASES,
      useClass: DevolucionesService,
    },
    {
      provide: DEVOLUCIONES_REPOSITORY,
      useClass: DevolucionesRepositoryAdapter,
    },
  ],
  exports: [DEVOLUCIONES_USE_CASES, DEVOLUCIONES_REPOSITORY],
})
export class DevolucionesModule {}
