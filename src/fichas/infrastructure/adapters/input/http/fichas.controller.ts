import { Controller, Get, Post, Body, Param, ParseIntPipe, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { FICHAS_USE_CASES, IFichasUseCases } from '../../../../domain/ports/input/fichas-use-cases.interface';
import { CreateFichaDto } from './dtos/create-ficha.dto';
import { FichaNotFoundException } from '../../../../domain/exceptions/ficha-not-found.exception';

@Controller('fichas')
export class FichasController {
  constructor(
    @Inject(FICHAS_USE_CASES)
    private readonly fichasUseCases: IFichasUseCases,
  ) {}

  @Get()
  async getFichas() {
    try {
      const fichas = await this.fichasUseCases.obtenerFichas();
      return {
        statusCode: HttpStatus.OK,
        message: 'Fichas obtenidas exitosamente',
        data: fichas,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener las fichas',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getFicha(@Param('id', ParseIntPipe) id: number) {
    try {
      const ficha = await this.fichasUseCases.obtenerFichaPorId(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Ficha obtenida exitosamente',
        data: ficha,
      };
    } catch (error) {
      if (error instanceof FichaNotFoundException) {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
          data: null,
        }, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener la ficha',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async createFicha(@Body() createFichaDto: CreateFichaDto) {
    try {
      const ficha = await this.fichasUseCases.crearFicha(createFichaDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Ficha creada exitosamente',
        data: ficha,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error al crear la ficha',
        data: null,
      }, HttpStatus.BAD_REQUEST);
    }
  }
}
