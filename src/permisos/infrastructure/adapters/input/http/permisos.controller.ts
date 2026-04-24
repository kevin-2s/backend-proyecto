import { Controller, Get, Post, Body, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { IPermisosUseCases } from '../../../../application/ports/input/permisos.use-cases.interface';
import { CrearPermisoDto } from './dtos/crear-permiso.dto';
import { JwtAuthGuard } from '../../../../../auth/infrastructure/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../../auth/infrastructure/guards/roles.guard';
import { Roles } from '../../../../../auth/infrastructure/decorators/roles.decorator';
import { Inject } from '@nestjs/common';

@ApiTags('Permisos')
@Controller('permisos')
export class PermisosController {
  constructor(
    @Inject(IPermisosUseCases)
    private readonly permisosService: IPermisosUseCases,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los permisos agrupados por módulo' })
  @ApiResponse({ status: 200, description: 'Permisos obtenidos exitosamente' })
  async findAll() {
    const data = await this.permisosService.findAllGroupedByModule();
    return {
      statusCode: 200,
      message: 'Permisos obtenidos exitosamente',
      data,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un permiso por id' })
  @ApiResponse({ status: 200, description: 'Permiso obtenido exitosamente' })
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.permisosService.findById(id);
    return {
      statusCode: 200,
      message: 'Permiso obtenido exitosamente',
      data,
    };
  }

  @Post()
  @Roles('Administrador')
  @ApiOperation({ summary: 'Crear un nuevo permiso (solo Administrador)' })
  @ApiResponse({ status: 201, description: 'Permiso creado exitosamente' })
  async create(@Body() dto: CrearPermisoDto) {
    const data = await this.permisosService.create(dto);
    return {
      statusCode: 201,
      message: 'Permiso creado exitosamente',
      data,
    };
  }
}
