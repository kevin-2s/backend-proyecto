import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimientoOrmEntity } from './entities/movimiento.orm-entity';
import { MovimientosController } from './adapters/input/http/movimientos.controller';
import { MovimientosService } from '../application/services/movimientos.service';
import { MovimientosRepositoryAdapter } from './adapters/output/persistence/movimientos.repository';
import { MOVIMIENTOS_USE_CASES } from '../domain/ports/input/movimientos-use-cases.interface';
import { MOVIMIENTOS_REPOSITORY } from '../domain/ports/output/movimientos-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([MovimientoOrmEntity])],
  controllers: [MovimientosController],
  providers: [
    {
      provide: MOVIMIENTOS_USE_CASES,
      useClass: MovimientosService,
    },
    {
      provide: MOVIMIENTOS_REPOSITORY,
      useClass: MovimientosRepositoryAdapter,
    },
  ],
  exports: [MOVIMIENTOS_USE_CASES, MOVIMIENTOS_REPOSITORY],
})
export class MovimientosModule {}
