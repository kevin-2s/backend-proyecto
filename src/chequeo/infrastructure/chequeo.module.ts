import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChequeoEntity } from './entities/chequeo.typeorm.entity';
import { ChequeoController } from './adapters/input/http/chequeo.controller';
import { ChequeoService } from '../application/services/chequeo.service';
import { ChequeoRepositoryAdapter } from './adapters/output/persistence/chequeo.repository.adapter';

@Module({
    imports: [TypeOrmModule.forFeature([ChequeoEntity])],
    controllers: [ChequeoController],
    providers: [
        { provide: 'ChequeoRepositoryPort', useClass: ChequeoRepositoryAdapter },
        { provide: 'FindChequeoUseCase', useFactory: (repo) => new ChequeoService(repo), inject: ['ChequeoRepositoryPort'] },
        { provide: 'CreateChequeoUseCase', useFactory: (repo) => new ChequeoService(repo), inject: ['ChequeoRepositoryPort'] }
    ],
    exports: ['ChequeoRepositoryPort']
})
export class ChequeoModule {}
