import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemChequeoOrmEntity } from './entities/item-chequeo.orm-entity';
import { ItemsChequeoController } from './adapters/input/http/items-chequeo.controller';
import { ItemsChequeoService } from '../application/services/items-chequeo.service';
import { ItemsChequeoRepositoryAdapter } from './adapters/output/persistence/items-chequeo.repository';
import { ITEMS_CHEQUEO_USE_CASES } from '../domain/ports/input/items-chequeo-use-cases.interface';
import { ITEMS_CHEQUEO_REPOSITORY } from '../domain/ports/output/items-chequeo-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([ItemChequeoOrmEntity])],
  controllers: [ItemsChequeoController],
  providers: [
    {
      provide: ITEMS_CHEQUEO_USE_CASES,
      useClass: ItemsChequeoService,
    },
    {
      provide: ITEMS_CHEQUEO_REPOSITORY,
      useClass: ItemsChequeoRepositoryAdapter,
    },
  ],
  exports: [ITEMS_CHEQUEO_USE_CASES, ITEMS_CHEQUEO_REPOSITORY],
})
export class ItemsChequeoModule {}
