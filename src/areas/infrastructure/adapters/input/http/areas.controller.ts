import { Controller, Get, Post, Body, Param, ParseIntPipe, Inject, HttpStatus, HttpException, Patch, Delete, UseGuards } from '@nestjs/common';
import { AREAS_USE_CASES, IAreasUseCases } from '../../../../domain/ports/input/areas-use-cases.interface';
import { CreateAreaDto } from './dtos/create-area.dto';
import { UpdateAreaDto } from './dtos/update-area.dto';
import { AreaNotFoundException } from '../../../../domain/exceptions/area-not-found.exception';
import { PermisosGuard } from '../../../../../auth/infrastructure/guards/permisos.guard';
import { RolesGuard } from '../../../../../auth/infrastructure/guards/roles.guard';
import { RequierePermiso } from '../../../../../auth/infrastructure/decorators/requiere-permiso.decorator';
import { Roles } from '../../../../../auth/infrastructure/decorators/roles.decorator';

@Controller('areas')
@UseGuards(PermisosGuard)
export class AreasController {
  constructor(
    @Inject(AREAS_USE_CASES)
    private readonly areasUseCases: IAreasUseCases,
  ) {}

  @Get()
  @RequierePermiso('ver_areas')
  async getAreas() {
    try {
      const areas = await this.areasUseCases.obtenerAreas();
      return {
        statusCode: HttpStatus.OK,
        message: 'Áreas obtenidas exitosamente',
        data: areas,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener las áreas',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @RequierePermiso('ver_areas')
  async getArea(@Param('id', ParseIntPipe) id: number) {
    try {
      const area = await this.areasUseCases.obtenerAreaPorId(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Área obtenida exitosamente',
        data: area,
      };
    } catch (error) {
      if (error instanceof AreaNotFoundException) {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
          data: null,
        }, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener el área',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('Administrador')
  async createArea(@Body() createAreaDto: CreateAreaDto) {
    try {
      const area = await this.areasUseCases.crearArea(createAreaDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Área creada exitosamente',
        data: area,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error al crear el área',
        data: null,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('Administrador')
  async updateArea(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAreaDto: UpdateAreaDto,
  ) {
    try {
      const area = await this.areasUseCases.actualizarArea(id, updateAreaDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Área actualizada exitosamente',
        data: area,
      };
    } catch (error) {
      if (error instanceof AreaNotFoundException) {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
          data: null,
        }, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error al actualizar el área',
        data: null,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('Administrador')
  async deleteArea(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.areasUseCases.eliminarArea(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Área eliminada exitosamente',
        data: null,
      };
    } catch (error) {
      if (error instanceof AreaNotFoundException) {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
          data: null,
        }, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al eliminar el área',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}