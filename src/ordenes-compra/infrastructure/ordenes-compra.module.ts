import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdenesCompraController } from './adapters/input/http/ordenes-compra.controller';
import { OrdenesCompraService } from '../application/services/ordenes-compra.service';
import { OrdenesCompraRepository } from './adapters/output/persistence/ordenes-compra.repository';
import { OrdenCompraOrmEntity } from './entities/orden-compra.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrdenCompraOrmEntity])],
  controllers: [OrdenesCompraController],
  providers: [
    OrdenesCompraService,
    {
      provide: 'OrdenesCompraRepositoryInterface',
      useClass: OrdenesCompraRepository,
    },
  ],
  exports: [OrdenesCompraService],
})
export class OrdenesCompraModule {}
