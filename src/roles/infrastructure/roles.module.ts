import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolOrmEntity } from './entities/rol.orm-entity';
import { RolesController } from './adapters/input/http/roles.controller';
import { RolesService } from '../application/services/roles.service';
import { RolesRepositoryAdapter } from './adapters/output/persistence/roles.repository';
import { ROLES_USE_CASES } from '../domain/ports/input/roles-use-cases.interface';
import { ROLES_REPOSITORY } from '../domain/ports/output/roles-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([RolOrmEntity])],
  controllers: [RolesController],
  providers: [
    {
      provide: ROLES_USE_CASES,
      useClass: RolesService,
    },
    {
      provide: ROLES_REPOSITORY,
      useClass: RolesRepositoryAdapter,
    },
  ],
  exports: [ROLES_USE_CASES, ROLES_REPOSITORY],
})
export class RolesModule {}
