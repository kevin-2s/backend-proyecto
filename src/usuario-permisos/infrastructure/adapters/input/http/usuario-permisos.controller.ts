import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, ParseIntPipe, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { IUsuarioPermisosUseCases } from '../../../../application/ports/input/usuario-permisos.use-cases.interface';
import { AsignarPermisoDto } from './dtos/asignar-permiso.dto';
import { ActualizarPermisoUsuarioDto } from './dtos/actualizar-permiso-usuario.dto';
import { JwtAuthGuard } from '../../../../../auth/infrastructure/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../../auth/infrastructure/guards/roles.guard';
import { Roles } from '../../../../../auth/infrastructure/decorators/roles.decorator';

@ApiTags('Usuario Permisos')
@Controller('usuarios/:id/permisos')
export class UsuarioPermisosController {
  constructor(
    @Inject(IUsuarioPermisosUseCases)
    private readonly usuarioPermisosService: IUsuarioPermisosUseCases,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los permisos de un usuario con su estado' })
  @ApiResponse({ status: 200, description: 'Permisos del usuario obtenidos exitosamente' })
  async getPermisos(@Param('id', ParseIntPipe) id: number) {
    const data = await this.usuarioPermisosService.getPermisosByUsuario(id);
    return {
      statusCode: 200,
      message: 'Permisos del usuario obtenidos exitosamente',
      data,
    };
  }

  @Post()
  @Roles('Administrador')
  @ApiOperation({ summary: 'Asigna un permiso a un usuario' })
  @ApiResponse({ status: 201, description: 'Permiso asignado exitosamente' })
  async asignarPermiso(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AsignarPermisoDto,
  ) {
    const data = await this.usuarioPermisosService.asignarPermiso(id, dto);
    return {
      statusCode: 201,
      message: 'Permiso asignado exitosamente',
      data,
    };
  }

  @Patch(':id_permiso')
  @Roles('Administrador')
  @ApiOperation({ summary: 'Activa o desactiva un permiso específico de un usuario' })
  @ApiResponse({ status: 200, description: 'Permiso actualizado exitosamente' })
  async actualizarPermiso(
    @Param('id', ParseIntPipe) id: number,
    @Param('id_permiso', ParseIntPipe) id_permiso: number,
    @Body() dto: ActualizarPermisoUsuarioDto,
  ) {
    const data = await this.usuarioPermisosService.actualizarPermiso(id, id_permiso, dto);
    return {
      statusCode: 200,
      message: 'Permiso actualizado exitosamente',
      data,
    };
  }

  @Delete(':id_permiso')
  @Roles('Administrador')
  @ApiOperation({ summary: 'Elimina un permiso de un usuario' })
  @ApiResponse({ status: 200, description: 'Permiso eliminado exitosamente' })
  async eliminarPermiso(
    @Param('id', ParseIntPipe) id: number,
    @Param('id_permiso', ParseIntPipe) id_permiso: number,
  ) {
    await this.usuarioPermisosService.eliminarPermiso(id, id_permiso);
    return {
      statusCode: 200,
      message: 'Permiso eliminado exitosamente',
    };
  }
}
