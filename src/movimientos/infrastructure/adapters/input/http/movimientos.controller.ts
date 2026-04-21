import { Controller, Get, Post, Body, Param, ParseIntPipe, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { MOVIMIENTOS_USE_CASES, IMovimientosUseCases } from '../../../../domain/ports/input/movimientos-use-cases.interface';
import { CreateMovimientoDto } from './dtos/create-movimiento.dto';
import { MovimientoNotFoundException } from '../../../../domain/exceptions/movimiento-not-found.exception';

@Controller('movimientos')
export class MovimientosController {
  constructor(
    @Inject(MOVIMIENTOS_USE_CASES)
    private readonly movimientosUseCases: IMovimientosUseCases,
  ) {}

  @Get()
  async getMovimientos() {
    try {
      const movimientos = await this.movimientosUseCases.obtenerMovimientos();
      return {
        statusCode: HttpStatus.OK,
        message: 'Movimientos obtenidos exitosamente',
        data: movimientos,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener los movimientos',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getMovimiento(@Param('id', ParseIntPipe) id: number) {
    try {
      const movimiento = await this.movimientosUseCases.obtenerMovimientoPorId(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Movimiento obtenido exitosamente',
        data: movimiento,
      };
    } catch (error) {
      if (error instanceof MovimientoNotFoundException) {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
          data: null,
        }, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener el movimiento',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async createMovimiento(@Body() createMovimientoDto: CreateMovimientoDto) {
    try {
      const movimiento = await this.movimientosUseCases.crearMovimiento({
        ...createMovimientoDto,
        observacion: createMovimientoDto.observacion ?? null,
      });
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Movimiento creado exitosamente',
        data: movimiento,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error al crear el movimiento',
        data: null,
      }, HttpStatus.BAD_REQUEST);
    }
  }
}
