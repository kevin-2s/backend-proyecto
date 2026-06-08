import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SedeOrmEntity } from './entities/sede.orm-entity';
import { SedesController } from './adapters/input/http/sedes.controller';
import { SedesService } from '../application/services/sedes.service';
import { SedesRepositoryAdapter } from './adapters/output/persistence/sedes.repository';
import { SEDES_USE_CASES } from '../domain/ports/input/sedes-use-cases.interface';
import { SEDES_REPOSITORY } from '../domain/ports/output/sedes-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([SedeOrmEntity])],
  controllers: [SedesController],
  providers: [
    {
      provide: SEDES_USE_CASES,
      useClass: SedesService,
    },
    {
      provide: SEDES_REPOSITORY,
      useClass: SedesRepositoryAdapter,
    },
  ],
  exports: [SEDES_USE_CASES, SEDES_REPOSITORY],
})
export class SedesModule {}
