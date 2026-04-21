import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemOrmEntity } from './entities/item.orm-entity';
import { ItemsController } from './adapters/input/http/items.controller';
import { ItemsService } from '../application/services/items.service';
import { ItemsRepositoryAdapter } from './adapters/output/persistence/items.repository';
import { ITEMS_USE_CASES } from '../domain/ports/input/items-use-cases.interface';
import { ITEMS_REPOSITORY } from '../domain/ports/output/items-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([ItemOrmEntity])],
  controllers: [ItemsController],
  providers: [
    {
      provide: ITEMS_USE_CASES,
      useClass: ItemsService,
    },
    {
      provide: ITEMS_REPOSITORY,
      useClass: ItemsRepositoryAdapter,
    },
  ],
  exports: [ITEMS_USE_CASES, ITEMS_REPOSITORY],
})
export class ItemsModule {}
