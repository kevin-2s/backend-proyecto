import { Controller, Get, Post, Body, Param, ParseIntPipe, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { ACTAS_USE_CASES, IActasUseCases } from '../../../../domain/ports/input/actas-use-cases.interface';
import { CreateActaDto } from './dtos/create-acta.dto';
import { ActaNotFoundException } from '../../../../domain/exceptions/acta-not-found.exception';

@Controller('actas')
export class ActasController {
  constructor(
    @Inject(ACTAS_USE_CASES)
    private readonly actasUseCases: IActasUseCases,
  ) {}

  @Get()
  async getActas() {
    try {
      const actas = await this.actasUseCases.obtenerActas();
      return {
        statusCode: HttpStatus.OK,
        message: 'Actas obtenidas exitosamente',
        data: actas,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener las actas',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getActa(@Param('id', ParseIntPipe) id: number) {
    try {
      const acta = await this.actasUseCases.obtenerActaPorId(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Acta obtenida exitosamente',
        data: acta,
      };
    } catch (error) {
      if (error instanceof ActaNotFoundException) {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
          data: null,
        }, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener el acta',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async createActa(@Body() createActaDto: CreateActaDto) {
    try {
      const acta = await this.actasUseCases.crearActa(createActaDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Acta creada exitosamente',
        data: acta,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error al crear el acta',
        data: null,
      }, HttpStatus.BAD_REQUEST);
    }
  }
}
