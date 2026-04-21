import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FichaOrmEntity } from './entities/ficha.orm-entity';
import { FichasController } from './adapters/input/http/fichas.controller';
import { FichasService } from '../application/services/fichas.service';
import { FichasRepositoryAdapter } from './adapters/output/persistence/fichas.repository';
import { FICHAS_USE_CASES } from '../domain/ports/input/fichas-use-cases.interface';
import { FICHAS_REPOSITORY } from '../domain/ports/output/fichas-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([FichaOrmEntity])],
  controllers: [FichasController],
  providers: [
    {
      provide: FICHAS_USE_CASES,
      useClass: FichasService,
    },
    {
      provide: FICHAS_REPOSITORY,
      useClass: FichasRepositoryAdapter,
    },
  ],
  exports: [FICHAS_USE_CASES, FICHAS_REPOSITORY],
})
export class FichasModule {}
