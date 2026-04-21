import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaOrmEntity } from './entities/categoria.orm-entity';
import { CategoriasController } from './adapters/input/http/categorias.controller';
import { CategoriasService } from '../application/services/categorias.service';
import { CategoriasRepositoryAdapter } from './adapters/output/persistence/categorias.repository';
import { CATEGORIAS_USE_CASES } from '../domain/ports/input/categorias-use-cases.interface';
import { CATEGORIAS_REPOSITORY } from '../domain/ports/output/categorias-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaOrmEntity])],
  controllers: [CategoriasController],
  providers: [
    {
      provide: CATEGORIAS_USE_CASES,
      useClass: CategoriasService,
    },
    {
      provide: CATEGORIAS_REPOSITORY,
      useClass: CategoriasRepositoryAdapter,
    },
  ],
  exports: [CATEGORIAS_USE_CASES, CATEGORIAS_REPOSITORY],
})
export class CategoriasModule {}
