import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramaOrmEntity } from './entities/programa.orm-entity';
import { ProgramasController } from './adapters/input/http/programas.controller';
import { ProgramasService } from '../application/services/programas.service';
import { ProgramasRepositoryAdapter } from './adapters/output/persistence/programas.repository';
import { PROGRAMAS_USE_CASES } from '../domain/ports/input/programas-use-cases.interface';
import { PROGRAMAS_REPOSITORY } from '../domain/ports/output/programas-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramaOrmEntity])],
  controllers: [ProgramasController],
  providers: [
    {
      provide: PROGRAMAS_USE_CASES,
      useClass: ProgramasService,
    },
    {
      provide: PROGRAMAS_REPOSITORY,
      useClass: ProgramasRepositoryAdapter,
    },
  ],
  exports: [PROGRAMAS_USE_CASES, PROGRAMAS_REPOSITORY],
})
export class ProgramasModule {}
