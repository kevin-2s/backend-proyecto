import { Controller, Get, Post, Body, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { TIPOS_MOVIMIENTO_USE_CASES, ITiposMovimientoUseCases } from '../../../../domain/ports/input/tipos-movimiento-use-cases.interface';
import { CreateTipoMovimientoDto } from './dtos/create-tipo-movimiento.dto';

@Controller('tipo-movimiento')
export class TiposMovimientoController {
  constructor(
    @Inject(TIPOS_MOVIMIENTO_USE_CASES)
    private readonly tiposMovimientoUseCases: ITiposMovimientoUseCases,
  ) {}

  @Get()
  async getTiposMovimiento() {
    try {
      const tipos = await this.tiposMovimientoUseCases.obtenerTiposMovimiento();
      return {
        statusCode: HttpStatus.OK,
        message: 'Tipos de movimiento obtenidos exitosamente',
        data: tipos,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener los tipos de movimiento',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async createTipoMovimiento(@Body() createTipoMovimientoDto: CreateTipoMovimientoDto) {
    try {
      const tipo = await this.tiposMovimientoUseCases.crearTipoMovimiento(createTipoMovimientoDto.nombre);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Tipo de movimiento creado exitosamente',
        data: tipo,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error al crear el tipo de movimiento',
        data: null,
      }, HttpStatus.BAD_REQUEST);
    }
  }
}
