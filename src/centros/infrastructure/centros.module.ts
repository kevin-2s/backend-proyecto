import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CentroOrmEntity } from './entities/centro.orm-entity';
import { CentrosController } from './adapters/input/http/centros.controller';
import { CentrosService } from '../application/services/centros.service';
import { CentrosRepositoryAdapter } from './adapters/output/persistence/centros.repository';
import { CENTROS_USE_CASES } from '../domain/ports/input/centros-use-cases.interface';
import { CENTROS_REPOSITORY } from '../domain/ports/output/centros-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([CentroOrmEntity])],
  controllers: [CentrosController],
  providers: [
    {
      provide: CENTROS_USE_CASES,
      useClass: CentrosService,
    },
    {
      provide: CENTROS_REPOSITORY,
      useClass: CentrosRepositoryAdapter,
    },
  ],
  exports: [CENTROS_USE_CASES, CENTROS_REPOSITORY],
})
export class CentrosModule {}
