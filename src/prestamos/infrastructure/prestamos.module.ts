import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrestamoOrmEntity } from './entities/prestamo.orm-entity';
import { PrestamosController } from './adapters/input/http/prestamos.controller';
import { PrestamosService } from '../application/services/prestamos.service';
import { PrestamosRepositoryAdapter } from './adapters/output/persistence/prestamos.repository';
import { PRESTAMOS_USE_CASES } from '../domain/ports/input/prestamos-use-cases.interface';
import { PRESTAMOS_REPOSITORY } from '../domain/ports/output/prestamos-repository.interface';
import { ItemsModule } from '../../items/infrastructure/items.module';
import { KardexModule } from '../../kardex/infrastructure/kardex.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PrestamoOrmEntity]),
    ItemsModule,
    KardexModule,
  ],
  controllers: [PrestamosController],
  providers: [
    {
      provide: PRESTAMOS_USE_CASES,
      useClass: PrestamosService,
    },
    {
      provide: PRESTAMOS_REPOSITORY,
      useClass: PrestamosRepositoryAdapter,
    },
  ],
  exports: [PRESTAMOS_USE_CASES],
})
export class PrestamosModule {}
