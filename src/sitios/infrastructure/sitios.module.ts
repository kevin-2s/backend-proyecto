import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SitioOrmEntity } from './entities/sitio.orm-entity';
import { SitiosController } from './adapters/input/http/sitios.controller';
import { SitiosService } from '../application/services/sitios.service';
import { SitiosRepositoryAdapter } from './adapters/output/persistence/sitios.repository';
import { SITIOS_USE_CASES } from '../domain/ports/input/sitios-use-cases.interface';
import { SITIOS_REPOSITORY } from '../domain/ports/output/sitios-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([SitioOrmEntity])],
  controllers: [SitiosController],
  providers: [
    {
      provide: SITIOS_USE_CASES,
      useClass: SitiosService,
    },
    {
      provide: SITIOS_REPOSITORY,
      useClass: SitiosRepositoryAdapter,
    },
  ],
  exports: [SITIOS_USE_CASES, SITIOS_REPOSITORY],
})
export class SitiosModule {}
