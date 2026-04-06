import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActaEntity } from './entities/acta.typeorm.entity';
import { ActaController } from './adapters/input/http/actas.controller';
import { ActaService } from '../application/services/actas.service';
import { ActaRepositoryAdapter } from './adapters/output/persistence/acta.repository.adapter';

@Module({
    imports: [TypeOrmModule.forFeature([ActaEntity])],
    controllers: [ActaController],
    providers: [
        { provide: 'ActaRepositoryPort', useClass: ActaRepositoryAdapter },
        { provide: 'FindActaUseCase', useFactory: (repo) => new ActaService(repo), inject: ['ActaRepositoryPort'] },
        { provide: 'CreateActaUseCase', useFactory: (repo) => new ActaService(repo), inject: ['ActaRepositoryPort'] }
    ],
    exports: ['ActaRepositoryPort']
})
export class ActasModule {}
