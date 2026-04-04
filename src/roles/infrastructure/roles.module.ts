import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.typeorm.entity';
import { RolesController } from './adapters/input/http/roles.controller';
import { RolesService } from '../application/services/roles.service';
import { RoleRepositoryAdapter } from './adapters/output/persistence/role.repository.adapter';

@Module({
    imports: [TypeOrmModule.forFeature([RoleEntity])],
    controllers: [RolesController],
    providers: [
        {
            provide: 'RoleRepositoryPort',
            useClass: RoleRepositoryAdapter
        },
        {
            provide: 'FindRolesUseCase',
            useFactory: (repository) => new RolesService(repository),
            inject: ['RoleRepositoryPort']
        },
        {
            provide: 'CreateRoleUseCase',
            useFactory: (repository) => new RolesService(repository),
            inject: ['RoleRepositoryPort']
        }
    ],
    exports: ['RoleRepositoryPort']
})
export class RolesModule {}
