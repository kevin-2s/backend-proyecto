import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChequeoOrmEntity } from './entities/chequeo.orm-entity';
import { ChequeosController } from './adapters/input/http/chequeos.controller';
import { ChequeosService } from '../application/services/chequeos.service';
import { ChequeosRepositoryAdapter } from './adapters/output/persistence/chequeos.repository';
import { CHEQUEOS_USE_CASES } from '../domain/ports/input/chequeos-use-cases.interface';
import { CHEQUEOS_REPOSITORY } from '../domain/ports/output/chequeos-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([ChequeoOrmEntity])],
  controllers: [ChequeosController],
  providers: [
    {
      provide: CHEQUEOS_USE_CASES,
      useClass: ChequeosService,
    },
    {
      provide: CHEQUEOS_REPOSITORY,
      useClass: ChequeosRepositoryAdapter,
    },
  ],
  exports: [CHEQUEOS_USE_CASES, CHEQUEOS_REPOSITORY],
})
export class ChequeosModule {}
