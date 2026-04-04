import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoEntity } from './entities/producto.typeorm.entity';
import { ProductoController } from './adapters/input/http/productos.controller';
import { ProductoService } from '../application/services/productos.service';
import { ProductoRepositoryAdapter } from './adapters/output/persistence/producto.repository.adapter';

@Module({
    imports: [TypeOrmModule.forFeature([ProductoEntity])],
    controllers: [ProductoController],
    providers: [
        { provide: 'ProductoRepositoryPort', useClass: ProductoRepositoryAdapter },
        { provide: 'FindProductoUseCase', useFactory: (repo) => new ProductoService(repo), inject: ['ProductoRepositoryPort'] },
        { provide: 'CreateProductoUseCase', useFactory: (repo) => new ProductoService(repo), inject: ['ProductoRepositoryPort'] }
    ],
    exports: ['ProductoRepositoryPort']
})
export class productosModule {}
