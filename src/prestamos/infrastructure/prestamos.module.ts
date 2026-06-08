import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrestamosController } from './adapters/input/http/prestamos.controller';
import { PrestamosService } from '../application/services/prestamos.service';
import { PrestamosRepository } from './adapters/output/persistence/prestamos.repository';
import { PrestamoOrmEntity } from './entities/prestamo.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([PrestamoOrmEntity])],
  controllers: [PrestamosController],
  providers: [
    PrestamosService,
    {
      provide: 'PrestamosRepositoryInterface',
      useClass: PrestamosRepository,
    },
  ],
  exports: [PrestamosService],
})
export class PrestamosModule {}
