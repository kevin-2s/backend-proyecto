import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SitioEntity } from './entities/sitio.typeorm.entity';
import { SitioController } from './adapters/input/http/sitios.controller';
import { SitioService } from '../application/services/sitios.service';
import { SitioRepositoryAdapter } from './adapters/output/persistence/sitio.repository.adapter';

@Module({
    imports: [TypeOrmModule.forFeature([SitioEntity])],
    controllers: [SitioController],
    providers: [
        { provide: 'SitioRepositoryPort', useClass: SitioRepositoryAdapter },
        { provide: 'FindSitioUseCase', useFactory: (repo) => new SitioService(repo), inject: ['SitioRepositoryPort'] },
        { provide: 'CreateSitioUseCase', useFactory: (repo) => new SitioService(repo), inject: ['SitioRepositoryPort'] }
    ],
    exports: ['SitioRepositoryPort']
})
export class sitiosModule {}
