import { Controller, Get, Post, Body, Param, ParseIntPipe, Inject, HttpStatus, HttpException, Patch, Delete, UseGuards } from '@nestjs/common';
import { CENTROS_USE_CASES, ICentrosUseCases } from '../../../../domain/ports/input/centros-use-cases.interface';
import { CreateCentroDto } from './dtos/create-centro.dto';
import { UpdateCentroDto } from './dtos/update-centro.dto';
import { CentroNotFoundException } from '../../../../domain/exceptions/centro-not-found.exception';
import { PermisosGuard } from '../../../../../auth/infrastructure/guards/permisos.guard';
import { RequierePermiso } from '../../../../../auth/infrastructure/decorators/requiere-permiso.decorator';

@Controller('centros')
@UseGuards(PermisosGuard)
export class CentrosController {
  constructor(
    @Inject(CENTROS_USE_CASES)
    private readonly centrosUseCases: ICentrosUseCases,
  ) {}

  @Get()
  @RequierePermiso('ver_centros')
  async getCentros() {
    try {
      const centros = await this.centrosUseCases.obtenerCentros();
      return {
        statusCode: HttpStatus.OK,
        message: 'Centros obtenidos exitosamente',
        data: centros,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener los centros',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @RequierePermiso('ver_centros')
  async getCentro(@Param('id', ParseIntPipe) id: number) {
    try {
      const centro = await this.centrosUseCases.obtenerCentroPorId(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Centro obtenido exitosamente',
        data: centro,
      };
    } catch (error) {
      if (error instanceof CentroNotFoundException) {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
          data: null,
        }, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener el centro',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @RequierePermiso('crear_centros')
  async createCentro(@Body() createCentroDto: CreateCentroDto) {
    try {
      const centro = await this.centrosUseCases.crearCentro(createCentroDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Centro creado exitosamente',
        data: centro,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error al crear el centro',
        data: null,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  @RequierePermiso('editar_centros')
  async updateCentro(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCentroDto: UpdateCentroDto,
  ) {
    try {
      const centro = await this.centrosUseCases.actualizarCentro(id, updateCentroDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Centro actualizado exitosamente',
        data: centro,
      };
    } catch (error) {
      if (error instanceof CentroNotFoundException) {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
          data: null,
        }, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error al actualizar el centro',
        data: null,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @RequierePermiso('eliminar_centros')
  async deleteCentro(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.centrosUseCases.eliminarCentro(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Centro eliminado exitosamente',
        data: null,
      };
    } catch (error) {
      if (error instanceof CentroNotFoundException) {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
          data: null,
        }, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al eliminar el centro',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
