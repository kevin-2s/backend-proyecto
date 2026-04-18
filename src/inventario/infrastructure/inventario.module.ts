import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventarioOrmEntity } from './entities/inventario.orm-entity';
import { InventarioController } from './adapters/input/http/inventario.controller';
import { InventarioService } from '../application/services/inventario.service';
import { InventarioRepositoryAdapter } from './adapters/output/persistence/inventario.repository';
import { INVENTARIO_USE_CASES } from '../domain/ports/input/inventario-use-cases.interface';
import { INVENTARIO_REPOSITORY } from '../domain/ports/output/inventario-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([InventarioOrmEntity])],
  controllers: [InventarioController],
  providers: [
    {
      provide: INVENTARIO_USE_CASES,
      useClass: InventarioService,
    },
    {
      provide: INVENTARIO_REPOSITORY,
      useClass: InventarioRepositoryAdapter,
    },
  ],
  exports: [INVENTARIO_USE_CASES, INVENTARIO_REPOSITORY],
})
export class InventarioModule {}
