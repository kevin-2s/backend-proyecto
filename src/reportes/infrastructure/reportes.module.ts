import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReporteEntity } from './entities/reporte.typeorm.entity';
import { ReporteController } from './adapters/input/http/reportes.controller';
import { ReporteService } from '../application/services/reportes.service';
import { ReporteRepositoryAdapter } from './adapters/output/persistence/reporte.repository.adapter';

@Module({
    imports: [TypeOrmModule.forFeature([ReporteEntity])],
    controllers: [ReporteController],
    providers: [
        { provide: 'ReporteRepositoryPort', useClass: ReporteRepositoryAdapter },
        { provide: 'FindReporteUseCase', useFactory: (repo) => new ReporteService(repo), inject: ['ReporteRepositoryPort'] },
        { provide: 'CreateReporteUseCase', useFactory: (repo) => new ReporteService(repo), inject: ['ReporteRepositoryPort'] }
    ],
    exports: ['ReporteRepositoryPort']
})
export class ReportesModule {}
