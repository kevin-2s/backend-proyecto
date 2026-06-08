import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProveedoresController } from './adapters/input/http/proveedores.controller';
import { ProveedoresService } from '../application/services/proveedores.service';
import { ProveedoresRepository } from './adapters/output/persistence/proveedores.repository';
import { ProveedorOrmEntity } from './entities/proveedor.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProveedorOrmEntity])],
  controllers: [ProveedoresController],
  providers: [
    ProveedoresService,
    {
      provide: 'ProveedoresRepositoryInterface',
      useClass: ProveedoresRepository,
    },
  ],
  exports: [ProveedoresService],
})
export class ProveedoresModule {}
