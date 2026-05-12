import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KardexOrmEntity } from './entities/kardex.orm-entity';
import { KardexController } from './adapters/input/http/kardex.controller';
import { KardexService } from '../application/services/kardex.service';
import { KardexRepositoryAdapter } from './adapters/output/persistence/kardex.repository';
import { KARDEX_USE_CASES } from '../domain/ports/input/kardex-use-cases.interface';
import { KARDEX_REPOSITORY } from '../domain/ports/output/kardex-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([KardexOrmEntity])],
  controllers: [KardexController],
  providers: [
    {
      provide: KARDEX_USE_CASES,
      useClass: KardexService,
    },
    {
      provide: KARDEX_REPOSITORY,
      useClass: KardexRepositoryAdapter,
    },
  ],
  exports: [KARDEX_USE_CASES, KARDEX_REPOSITORY],
})
export class KardexModule {}
