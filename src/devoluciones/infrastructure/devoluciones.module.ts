import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevolucionEntity } from './entities/devolucion.typeorm.entity';
import { DevolucionController } from './adapters/input/http/devoluciones.controller';
import { DevolucionService } from '../application/services/devoluciones.service';
import { DevolucionRepositoryAdapter } from './adapters/output/persistence/devolucion.repository.adapter';

@Module({
    imports: [TypeOrmModule.forFeature([DevolucionEntity])],
    controllers: [DevolucionController],
    providers: [
        { provide: 'DevolucionRepositoryPort', useClass: DevolucionRepositoryAdapter },
        { provide: 'FindDevolucionUseCase', useFactory: (repo) => new DevolucionService(repo), inject: ['DevolucionRepositoryPort'] },
        { provide: 'CreateDevolucionUseCase', useFactory: (repo) => new DevolucionService(repo), inject: ['DevolucionRepositoryPort'] }
    ],
    exports: ['DevolucionRepositoryPort']
})
export class devolucionesModule {}
