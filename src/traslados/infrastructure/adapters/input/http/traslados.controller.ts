import { Controller, Get, Post, Body, Param, Patch, ParseIntPipe, Inject, HttpStatus, HttpException, UseGuards } from '@nestjs/common';
import { TRASLADOS_USE_CASES, ITrasladosUseCases } from '../../../../domain/ports/input/traslados-use-cases.interface';
import { CreateTrasladoDto } from './dtos/create-traslado.dto';
import { ResolverTrasladoDto } from './dtos/resolver-traslado.dto';
import { TrasladoNotFoundException } from '../../../../domain/exceptions/traslado-not-found.exception';
import { PermisosGuard } from '../../../../../auth/infrastructure/guards/permisos.guard';
import { RequierePermiso } from '../../../../../auth/infrastructure/decorators/requiere-permiso.decorator';

@Controller('traslados')
@UseGuards(PermisosGuard)
export class TrasladosController {
  constructor(
    @Inject(TRASLADOS_USE_CASES)
    private readonly useCases: ITrasladosUseCases,
  ) {}

  @Get()
  @RequierePermiso('ver_traslados')
  async getAll() {
    try {
      const data = await this.useCases.obtenerTraslados();
      return { statusCode: HttpStatus.OK, message: 'Traslados obtenidos exitosamente', data };
    } catch {
      throw new HttpException({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Error al obtener los traslados', data: null }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @RequierePermiso('ver_traslados')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const data = await this.useCases.obtenerTrasladoPorId(id);
      return { statusCode: HttpStatus.OK, message: 'Traslado obtenido exitosamente', data };
    } catch (error) {
      if (error instanceof TrasladoNotFoundException) {
        throw new HttpException({ statusCode: HttpStatus.NOT_FOUND, message: error.message, data: null }, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Error al obtener el traslado', data: null }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @RequierePermiso('crear_traslados')
  async create(@Body() dto: CreateTrasladoDto) {
    try {
      const data = await this.useCases.crearTraslado(dto);
      return { statusCode: HttpStatus.CREATED, message: 'Solicitud de traslado creada exitosamente', data };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al crear el traslado';
      throw new HttpException({ statusCode: HttpStatus.BAD_REQUEST, message, data: null }, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id/aprobar')
  @RequierePermiso('aprobar_traslados')
  async aprobar(@Param('id', ParseIntPipe) id: number, @Body() dto: ResolverTrasladoDto) {
    try {
      const data = await this.useCases.aprobarTraslado(id, dto.id_usuario_aprueba);
      return { statusCode: HttpStatus.OK, message: 'Traslado aprobado exitosamente', data };
    } catch (error) {
      if (error instanceof TrasladoNotFoundException) {
        throw new HttpException({ statusCode: HttpStatus.NOT_FOUND, message: error.message, data: null }, HttpStatus.NOT_FOUND);
      }
      const message = error instanceof Error ? error.message : 'Error al aprobar el traslado';
      throw new HttpException({ statusCode: HttpStatus.BAD_REQUEST, message, data: null }, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id/rechazar')
  @RequierePermiso('rechazar_traslados')
  async rechazar(@Param('id', ParseIntPipe) id: number, @Body() dto: ResolverTrasladoDto) {
    try {
      const data = await this.useCases.rechazarTraslado(id, dto.id_usuario_aprueba, dto.observacion_resolucion);
      return { statusCode: HttpStatus.OK, message: 'Traslado rechazado', data };
    } catch (error) {
      if (error instanceof TrasladoNotFoundException) {
        throw new HttpException({ statusCode: HttpStatus.NOT_FOUND, message: error.message, data: null }, HttpStatus.NOT_FOUND);
      }
      const message = error instanceof Error ? error.message : 'Error al rechazar el traslado';
      throw new HttpException({ statusCode: HttpStatus.BAD_REQUEST, message, data: null }, HttpStatus.BAD_REQUEST);
    }
  }
}
