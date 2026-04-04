import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimientoEntity } from './entities/movimiento.typeorm.entity';
import { MovimientoController } from './adapters/input/http/movimientos.controller';
import { MovimientoService } from '../application/services/movimientos.service';
import { MovimientoRepositoryAdapter } from './adapters/output/persistence/movimiento.repository.adapter';

@Module({
    imports: [TypeOrmModule.forFeature([MovimientoEntity])],
    controllers: [MovimientoController],
    providers: [
        { provide: 'MovimientoRepositoryPort', useClass: MovimientoRepositoryAdapter },
        { provide: 'FindMovimientoUseCase', useFactory: (repo) => new MovimientoService(repo), inject: ['MovimientoRepositoryPort'] },
        { provide: 'CreateMovimientoUseCase', useFactory: (repo) => new MovimientoService(repo), inject: ['MovimientoRepositoryPort'] }
    ],
    exports: ['MovimientoRepositoryPort']
})
export class movimientosModule {}
