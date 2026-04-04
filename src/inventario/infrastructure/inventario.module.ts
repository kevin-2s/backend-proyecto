import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventarioEntity } from './entities/inventario.typeorm.entity';
import { InventarioController } from './adapters/input/http/inventario.controller';
import { InventarioService } from '../application/services/inventario.service';
import { InventarioRepositoryAdapter } from './adapters/output/persistence/inventario.repository.adapter';

@Module({
    imports: [TypeOrmModule.forFeature([InventarioEntity])],
    controllers: [InventarioController],
    providers: [
        { provide: 'InventarioRepositoryPort', useClass: InventarioRepositoryAdapter },
        { provide: 'FindInventarioUseCase', useFactory: (repo) => new InventarioService(repo), inject: ['InventarioRepositoryPort'] },
        { provide: 'CreateInventarioUseCase', useFactory: (repo) => new InventarioService(repo), inject: ['InventarioRepositoryPort'] }
    ],
    exports: ['InventarioRepositoryPort']
})
export class inventarioModule {}
