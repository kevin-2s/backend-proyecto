import { Controller, Get, Post, Body, Param, ParseIntPipe, Inject, HttpStatus, HttpException, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { ROLES_USE_CASES, IRolesUseCases } from '../../../../domain/ports/input/roles-use-cases.interface';
import { CreateRolDto } from './dtos/create-rol.dto';
import { RolNotFoundException } from '../../../../domain/exceptions/rol-not-found.exception';
import { PermisosGuard } from '../../../../../auth/infrastructure/guards/permisos.guard';
import { RequierePermiso } from '../../../../../auth/infrastructure/decorators/requiere-permiso.decorator';

@Controller('roles')
@UseGuards(PermisosGuard)
export class RolesController {
  constructor(
    @Inject(ROLES_USE_CASES)
    private readonly rolesUseCases: IRolesUseCases,
  ) {}

  @Get()
  @RequierePermiso('ver_roles')
  async getRoles(@Req() req: any) {
    try {
      let roles = await this.rolesUseCases.obtenerRoles();
      const isSuperAdmin = req.user?.roles?.includes('Super Administrador');
      if (!isSuperAdmin) {
        roles = roles.filter(rol => rol.nombre !== 'Super Administrador');
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Roles obtenidos exitosamente',
        data: roles,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener los roles',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @RequierePermiso('ver_roles')
  async getRol(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    try {
      const rol = await this.rolesUseCases.obtenerRolPorId(id);
      const isSuperAdmin = req.user?.roles?.includes('Super Administrador');
      if (rol.nombre === 'Super Administrador' && !isSuperAdmin) {
        throw new ForbiddenException('No tienes permiso para ver este rol');
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Rol obtenido exitosamente',
        data: rol,
      };
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      if (error instanceof RolNotFoundException) {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
          data: null,
        }, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener el rol',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @RequierePermiso('crear_roles')
  async createRol(@Body() createRolDto: CreateRolDto) {
    try {
      const rol = await this.rolesUseCases.crearRol(createRolDto.nombre);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Rol creado exitosamente',
        data: rol,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error al crear el rol',
        data: null,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id/permisos')
  @RequierePermiso('ver_roles')
  async getPermisosByRol(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    try {
      const rol = await this.rolesUseCases.obtenerRolPorId(id);
      const isSuperAdmin = req.user?.roles?.includes('Super Administrador');
      if (rol.nombre === 'Super Administrador' && !isSuperAdmin) {
        throw new ForbiddenException('No tienes permiso para acceder a los permisos de este rol');
      }
      const data = await this.rolesUseCases.obtenerPermisosPorRol(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Permisos del rol obtenidos exitosamente',
        data,
      };
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener permisos del rol',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post(':id/permisos')
  @RequierePermiso('editar_roles')
  async asignarPermisos(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: { id_permisos: number[] },
    @Req() req: any,
  ) {
    try {
      const rol = await this.rolesUseCases.obtenerRolPorId(id);
      const isSuperAdmin = req.user?.roles?.includes('Super Administrador');
      if (rol.nombre === 'Super Administrador' && !isSuperAdmin) {
        throw new ForbiddenException('No tienes permiso para modificar los permisos de este rol');
      }
      await this.rolesUseCases.asignarPermisos(id, dto.id_permisos);
      return {
        statusCode: HttpStatus.OK,
        message: 'Permisos asignados exitosamente',
        data: null,
      };
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error al asignar permisos',
        data: null,
      }, HttpStatus.BAD_REQUEST);
    }
  }
}