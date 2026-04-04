import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificacionEntity } from './entities/notificacion.typeorm.entity';
import { NotificacionController } from './adapters/input/http/notificaciones.controller';
import { NotificacionService } from '../application/services/notificaciones.service';
import { NotificacionRepositoryAdapter } from './adapters/output/persistence/notificacion.repository.adapter';

@Module({
    imports: [TypeOrmModule.forFeature([NotificacionEntity])],
    controllers: [NotificacionController],
    providers: [
        { provide: 'NotificacionRepositoryPort', useClass: NotificacionRepositoryAdapter },
        { provide: 'FindNotificacionUseCase', useFactory: (repo) => new NotificacionService(repo), inject: ['NotificacionRepositoryPort'] },
        { provide: 'CreateNotificacionUseCase', useFactory: (repo) => new NotificacionService(repo), inject: ['NotificacionRepositoryPort'] }
    ],
    exports: ['NotificacionRepositoryPort']
})
export class notificacionesModule {}
