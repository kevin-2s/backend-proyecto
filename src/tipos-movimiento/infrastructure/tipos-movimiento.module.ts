import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoMovimientoOrmEntity } from './entities/tipo-movimiento.orm-entity';
import { TiposMovimientoController } from './adapters/input/http/tipos-movimiento.controller';
import { TiposMovimientoService } from '../application/services/tipos-movimiento.service';
import { TiposMovimientoRepositoryAdapter } from './adapters/output/persistence/tipos-movimiento.repository';
import { TIPOS_MOVIMIENTO_USE_CASES } from '../domain/ports/input/tipos-movimiento-use-cases.interface';
import { TIPOS_MOVIMIENTO_REPOSITORY } from '../domain/ports/output/tipos-movimiento-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([TipoMovimientoOrmEntity])],
  controllers: [TiposMovimientoController],
  providers: [
    {
      provide: TIPOS_MOVIMIENTO_USE_CASES,
      useClass: TiposMovimientoService,
    },
    {
      provide: TIPOS_MOVIMIENTO_REPOSITORY,
      useClass: TiposMovimientoRepositoryAdapter,
    },
  ],
  exports: [TIPOS_MOVIMIENTO_USE_CASES, TIPOS_MOVIMIENTO_REPOSITORY],
})
export class TiposMovimientoModule {}
