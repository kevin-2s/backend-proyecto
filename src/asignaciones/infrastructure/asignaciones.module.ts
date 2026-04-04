import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsignaEntity } from './entities/asigna.typeorm.entity';
import { AsignaController } from './adapters/input/http/asignaciones.controller';
import { AsignaService } from '../application/services/asignaciones.service';
import { AsignaRepositoryAdapter } from './adapters/output/persistence/asigna.repository.adapter';

@Module({
    imports: [TypeOrmModule.forFeature([AsignaEntity])],
    controllers: [AsignaController],
    providers: [
        { provide: 'AsignaRepositoryPort', useClass: AsignaRepositoryAdapter },
        { provide: 'FindAsignaUseCase', useFactory: (repo) => new AsignaService(repo), inject: ['AsignaRepositoryPort'] },
        { provide: 'CreateAsignaUseCase', useFactory: (repo) => new AsignaService(repo), inject: ['AsignaRepositoryPort'] }
    ],
    exports: ['AsignaRepositoryPort']
})
export class asignacionesModule {}
