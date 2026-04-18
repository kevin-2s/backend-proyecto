import { Controller, Get, Post, Body, Param, ParseIntPipe, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { SITIOS_USE_CASES, ISitiosUseCases } from '../../../../domain/ports/input/sitios-use-cases.interface';
import { CreateSitioDto } from './dtos/create-sitio.dto';
import { SitioNotFoundException } from '../../../../domain/exceptions/sitio-not-found.exception';

@Controller('sitios')
export class SitiosController {
  constructor(
    @Inject(SITIOS_USE_CASES)
    private readonly sitiosUseCases: ISitiosUseCases,
  ) {}

  @Get()
  async getSitios() {
    try {
      const sitios = await this.sitiosUseCases.obtenerSitios();
      return {
        statusCode: HttpStatus.OK,
        message: 'Sitios obtenidos exitosamente',
        data: sitios,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener los sitios',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getSitio(@Param('id', ParseIntPipe) id: number) {
    try {
      const sitio = await this.sitiosUseCases.obtenerSitioPorId(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Sitio obtenido exitosamente',
        data: sitio,
      };
    } catch (error) {
      if (error instanceof SitioNotFoundException) {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
          data: null,
        }, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener el sitio',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async createSitio(@Body() createSitioDto: CreateSitioDto) {
    try {
      const sitio = await this.sitiosUseCases.crearSitio(createSitioDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Sitio creado exitosamente',
        data: sitio,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error al crear el sitio',
        data: null,
      }, HttpStatus.BAD_REQUEST);
    }
  }
}
