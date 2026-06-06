import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaOrmEntity } from './entities/area.orm-entity';
import { AreasController } from './adapters/input/http/areas.controller';
import { AreasService } from '../application/services/areas.service';
import { AreasRepositoryAdapter } from './adapters/output/persistence/areas.repository';
import { AREAS_USE_CASES } from '../domain/ports/input/areas-use-cases.interface';
import { AREAS_REPOSITORY } from '../domain/ports/output/areas-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([AreaOrmEntity])],
  controllers: [AreasController],
  providers: [
    {
      provide: AREAS_USE_CASES,
      useClass: AreasService,
    },
    {
      provide: AREAS_REPOSITORY,
      useClass: AreasRepositoryAdapter,
    },
  ],
  exports: [AREAS_USE_CASES, AREAS_REPOSITORY],
})
export class AreasModule {}
