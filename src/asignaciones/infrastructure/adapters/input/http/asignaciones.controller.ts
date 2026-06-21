import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe, Inject, HttpStatus, HttpException, UseGuards } from '@nestjs/common';
import { ASIGNACIONES_USE_CASES, IAsignacionesUseCases } from '../../../../domain/ports/input/asignaciones-use-cases.interface';
import { CreateAsignacionDto } from './dtos/create-asignacion.dto';
import { AgregarItemAsignacionDto } from './dtos/agregar-item-asignacion.dto';
import { AsignacionNotFoundException } from '../../../../domain/exceptions/asignacion-not-found.exception';
import { PermisosGuard } from '../../../../../auth/infrastructure/guards/permisos.guard';
import { RequierePermiso } from '../../../../../auth/infrastructure/decorators/requiere-permiso.decorator';

@Controller('asignaciones')
@UseGuards(PermisosGuard)
export class AsignacionesController {
  constructor(
    @Inject(ASIGNACIONES_USE_CASES)
    private readonly useCases: IAsignacionesUseCases,
  ) {}

  @Get()
  @RequierePermiso('ver_asignaciones')
  async getAll() {
    try {
      const data = await this.useCases.obtenerAsignaciones();
      return { statusCode: HttpStatus.OK, message: 'Asignaciones obtenidas exitosamente', data };
    } catch {
      throw new HttpException({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Error al obtener asignaciones', data: null }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @RequierePermiso('ver_asignaciones')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const data = await this.useCases.obtenerAsignacionPorId(id);
      return { statusCode: HttpStatus.OK, message: 'Asignación obtenida exitosamente', data };
    } catch (error) {
      if (error instanceof AsignacionNotFoundException) {
        throw new HttpException({ statusCode: HttpStatus.NOT_FOUND, message: error.message, data: null }, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Error al obtener la asignación', data: null }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @RequierePermiso('crear_asignaciones')
  async create(@Body() dto: CreateAsignacionDto) {
    try {
      const data = await this.useCases.crearAsignacion(dto);
      return { statusCode: HttpStatus.CREATED, message: 'Asignación creada exitosamente', data };
    } catch (error) {
      throw new HttpException({ statusCode: HttpStatus.BAD_REQUEST, message: 'Error al crear la asignación', data: null }, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id/anular')
  @RequierePermiso('crear_asignaciones')
  async anular(@Param('id', ParseIntPipe) id: number) {
    try {
      const data = await this.useCases.anularAsignacion(id);
      return { statusCode: HttpStatus.OK, message: 'Asignación anulada', data };
    } catch (error) {
      if (error instanceof AsignacionNotFoundException) {
        throw new HttpException({ statusCode: HttpStatus.NOT_FOUND, message: error.message, data: null }, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({ statusCode: HttpStatus.BAD_REQUEST, message: 'Error al anular la asignación', data: null }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':id/items')
  @RequierePermiso('crear_asignaciones')
  async agregarItem(@Param('id', ParseIntPipe) id: number, @Body() dto: AgregarItemAsignacionDto) {
    try {
      const data = await this.useCases.agregarItemAAsignacion(id, dto.id_item);
      return { statusCode: HttpStatus.CREATED, message: 'Ítem agregado a la asignación exitosamente', data };
    } catch (error) {
      if (error instanceof AsignacionNotFoundException) {
        throw new HttpException({ statusCode: HttpStatus.NOT_FOUND, message: error.message, data: null }, HttpStatus.NOT_FOUND);
      }
      const message = error instanceof Error ? error.message : 'Error al agregar el ítem a la asignación';
      throw new HttpException({ statusCode: HttpStatus.BAD_REQUEST, message, data: null }, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @RequierePermiso('crear_asignaciones')
  async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.useCases.eliminarAsignacion(id);
      return { statusCode: HttpStatus.OK, message: 'Asignación eliminada', data: null };
    } catch (error) {
      if (error instanceof AsignacionNotFoundException) {
        throw new HttpException({ statusCode: HttpStatus.NOT_FOUND, message: error.message, data: null }, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({ statusCode: HttpStatus.BAD_REQUEST, message: 'Error al eliminar la asignación', data: null }, HttpStatus.BAD_REQUEST);
    }
  }
}
