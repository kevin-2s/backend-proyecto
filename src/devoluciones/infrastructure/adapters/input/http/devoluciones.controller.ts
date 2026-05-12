import { Controller, Get, Post, Body, Param, ParseIntPipe, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { DEVOLUCIONES_USE_CASES, IDevolucionesUseCases } from '../../../../domain/ports/input/devoluciones-use-cases.interface';
import { CreateDevolucionDto } from './dtos/create-devolucion.dto';
import { DevolucionNotFoundException } from '../../../../domain/exceptions/devolucion-not-found.exception';

@Controller('devoluciones')
export class DevolucionesController {
  constructor(
    @Inject(DEVOLUCIONES_USE_CASES)
    private readonly devolucionesUseCases: IDevolucionesUseCases,
  ) {}

  @Get()
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
