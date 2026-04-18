import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActaOrmEntity } from './entities/acta.orm-entity';
import { ActasController } from './adapters/input/http/actas.controller';
import { ActasService } from '../application/services/actas.service';
import { ActasRepositoryAdapter } from './adapters/output/persistence/actas.repository';
import { ACTAS_USE_CASES } from '../domain/ports/input/actas-use-cases.interface';
import { ACTAS_REPOSITORY } from '../domain/ports/output/actas-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([ActaOrmEntity])],
  controllers: [ActasController],
  providers: [
    {
      provide: ACTAS_USE_CASES,
      useClass: ActasService,
    },
    {
      provide: ACTAS_REPOSITORY,
      useClass: ActasRepositoryAdapter,
    },
  ],
  exports: [ACTAS_USE_CASES, ACTAS_REPOSITORY],
})
export class ActasModule {}
