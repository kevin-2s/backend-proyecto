import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoOrmEntity } from './entities/producto.orm-entity';
import { ProductosController } from './adapters/input/http/productos.controller';
import { ProductosService } from '../application/services/productos.service';
import { ProductosRepositoryAdapter } from './adapters/output/persistence/productos.repository';
import { PRODUCTOS_USE_CASES } from '../domain/ports/input/productos-use-cases.interface';
import { PRODUCTOS_REPOSITORY } from '../domain/ports/output/productos-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([ProductoOrmEntity])],
  controllers: [ProductosController],
  providers: [
    {
      provide: PRODUCTOS_USE_CASES,
      useClass: ProductosService,
    },
    {
      provide: PRODUCTOS_REPOSITORY,
      useClass: ProductosRepositoryAdapter,
    },
  ],
  exports: [PRODUCTOS_USE_CASES, PRODUCTOS_REPOSITORY],
})
export class ProductosModule {}
