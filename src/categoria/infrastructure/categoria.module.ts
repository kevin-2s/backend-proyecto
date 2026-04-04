import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaEntity } from './entities/categoria.typeorm.entity';
import { CategoriaController } from './adapters/input/http/categoria.controller';
import { CategoriaService } from '../application/services/categoria.service';
import { CategoriaRepositoryAdapter } from './adapters/output/persistence/categoria.repository.adapter';

@Module({
    imports: [TypeOrmModule.forFeature([CategoriaEntity])],
    controllers: [CategoriaController],
    providers: [
        { provide: 'CategoriaRepositoryPort', useClass: CategoriaRepositoryAdapter },
        { provide: 'FindCategoriaUseCase', useFactory: (repo) => new CategoriaService(repo), inject: ['CategoriaRepositoryPort'] },
        { provide: 'CreateCategoriaUseCase', useFactory: (repo) => new CategoriaService(repo), inject: ['CategoriaRepositoryPort'] }
    ],
    exports: ['CategoriaRepositoryPort']
})
export class categoriaModule {}
