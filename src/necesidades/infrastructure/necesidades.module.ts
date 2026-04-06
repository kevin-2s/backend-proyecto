import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NecesidadEntity } from './entities/necesidad.typeorm.entity';
import { NecesidadController } from './adapters/input/http/necesidades.controller';
import { NecesidadService } from '../application/services/necesidades.service';
import { NecesidadRepositoryAdapter } from './adapters/output/persistence/necesidad.repository.adapter';

@Module({
    imports: [TypeOrmModule.forFeature([NecesidadEntity])],
    controllers: [NecesidadController],
    providers: [
        { provide: 'NecesidadRepositoryPort', useClass: NecesidadRepositoryAdapter },
        { provide: 'FindNecesidadUseCase', useFactory: (repo) => new NecesidadService(repo), inject: ['NecesidadRepositoryPort'] },
        { provide: 'CreateNecesidadUseCase', useFactory: (repo) => new NecesidadService(repo), inject: ['NecesidadRepositoryPort'] }
    ],
    exports: ['NecesidadRepositoryPort']
})
export class NecesidadesModule {}
