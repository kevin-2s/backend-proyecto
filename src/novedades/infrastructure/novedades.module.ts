import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NovedadOrmEntity } from './entities/novedad.orm-entity';
import { NovedadesController } from './adapters/input/http/novedades.controller';
import { NovedadesService } from '../application/services/novedades.service';
import { NovedadesRepositoryAdapter } from './adapters/output/persistence/novedades.repository';
import { NOVEDADES_USE_CASES } from '../domain/ports/input/novedades-use-cases.interface';
import { NOVEDADES_REPOSITORY } from '../domain/ports/output/novedades-repository.interface';
import { ItemOrmEntity } from '../../items/infrastructure/entities/item.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([NovedadOrmEntity, ItemOrmEntity])],
  controllers: [NovedadesController],
  providers: [
    { provide: NOVEDADES_USE_CASES, useClass: NovedadesService },
    { provide: NOVEDADES_REPOSITORY, useClass: NovedadesRepositoryAdapter },
  ],
  exports: [NOVEDADES_USE_CASES],
})
export class NovedadesModule {}
