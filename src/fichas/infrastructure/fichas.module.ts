import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FichaEntity } from './entities/ficha.typeorm.entity';
import { FichaController } from './adapters/input/http/fichas.controller';
import { FichaService } from '../application/services/fichas.service';
import { FichaRepositoryAdapter } from './adapters/output/persistence/ficha.repository.adapter';

@Module({
    imports: [TypeOrmModule.forFeature([FichaEntity])],
    controllers: [FichaController],
    providers: [
        { provide: 'FichaRepositoryPort', useClass: FichaRepositoryAdapter },
        { provide: 'FindFichaUseCase', useFactory: (repo) => new FichaService(repo), inject: ['FichaRepositoryPort'] },
        { provide: 'CreateFichaUseCase', useFactory: (repo) => new FichaService(repo), inject: ['FichaRepositoryPort'] }
    ],
    exports: ['FichaRepositoryPort']
})
export class fichasModule {}
