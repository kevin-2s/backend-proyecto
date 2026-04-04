import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './entities/usuario.typeorm.entity';
import { UsuarioController } from './adapters/input/http/users.controller';
import { UsuarioService } from '../application/services/users.service';
import { UsuarioRepositoryAdapter } from './adapters/output/persistence/usuario.repository.adapter';

@Module({
    imports: [TypeOrmModule.forFeature([UsuarioEntity])],
    controllers: [UsuarioController],
    providers: [
        { provide: 'UsuarioRepositoryPort', useClass: UsuarioRepositoryAdapter },
        { provide: 'FindUsuarioUseCase', useFactory: (repo) => new UsuarioService(repo), inject: ['UsuarioRepositoryPort'] },
        { provide: 'CreateUsuarioUseCase', useFactory: (repo) => new UsuarioService(repo), inject: ['UsuarioRepositoryPort'] }
    ],
    exports: ['UsuarioRepositoryPort']
})
export class usersModule {}
