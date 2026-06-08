import { Controller, Get, Post, Body, Param, ParseIntPipe, Inject, HttpStatus, HttpException, UseGuards } from '@nestjs/common';
import { DEVOLUCIONES_USE_CASES, IDevolucionesUseCases } from '../../../../domain/ports/input/devoluciones-use-cases.interface';
import { CreateDevolucionDto } from './dtos/create-devolucion.dto';
import { DevolucionNotFoundException } from '../../../../domain/exceptions/devolucion-not-found.exception';
import { PermisosGuard } from '../../../../../auth/infrastructure/guards/permisos.guard';
import { RequierePermiso } from '../../../../../auth/infrastructure/decorators/requiere-permiso.decorator';

@Controller('devoluciones')
@UseGuards(PermisosGuard)
export class DevolucionesController {
  constructor(
    @Inject(DEVOLUCIONES_USE_CASES)
    private readonly devolucionesUseCases: IDevolucionesUseCases,
  ) {}

  @Get()
  @RequierePermiso('ver_devoluciones')
  async getDevoluciones() {
    try {
      const devoluciones = await this.devolucionesUseCases.obtenerDevoluciones();
      return {
        statusCode: HttpStatus.OK,
        message: 'Devoluciones obtenidas exitosamente',
        data: devoluciones,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener las devoluciones',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @RequierePermiso('ver_devoluciones')
  async getDevolucion(@Param('id', ParseIntPipe) id: number) {
    try {
      const devolucion = await this.devolucionesUseCases.obtenerDevolucionPorId(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Devolución obtenida exitosamente',
        data: devolucion,
      };
    } catch (error) {
      if (error instanceof DevolucionNotFoundException) {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
          data: null,
        }, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener la devolución',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @RequierePermiso('crear_devoluciones')
  async createDevolucion(@Body() createDevolucionDto: CreateDevolucionDto) {
    try {
      const devolucion = await this.devolucionesUseCases.crearDevolucion(createDevolucionDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Devolución creada exitosamente',
        data: devolucion,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error al crear la devolución',
        data: null,
      }, HttpStatus.BAD_REQUEST);
    }
  }
}
