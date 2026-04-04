import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudEntity } from './entities/solicitud.typeorm.entity';
import { SolicitudController } from './adapters/input/http/solicitudes.controller';
import { SolicitudService } from '../application/services/solicitudes.service';
import { SolicitudRepositoryAdapter } from './adapters/output/persistence/solicitud.repository.adapter';

@Module({
    imports: [TypeOrmModule.forFeature([SolicitudEntity])],
    controllers: [SolicitudController],
    providers: [
        { provide: 'SolicitudRepositoryPort', useClass: SolicitudRepositoryAdapter },
        { provide: 'FindSolicitudUseCase', useFactory: (repo) => new SolicitudService(repo), inject: ['SolicitudRepositoryPort'] },
        { provide: 'CreateSolicitudUseCase', useFactory: (repo) => new SolicitudService(repo), inject: ['SolicitudRepositoryPort'] }
    ],
    exports: ['SolicitudRepositoryPort']
})
export class SolicitudesModule {}
