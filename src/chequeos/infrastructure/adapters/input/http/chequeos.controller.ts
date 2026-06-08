import { Controller, Get, Post, Body, Param, ParseIntPipe, Inject, HttpStatus, HttpException, UseGuards } from '@nestjs/common';
import { CHEQUEOS_USE_CASES, IChequeosUseCases } from '../../../../domain/ports/input/chequeos-use-cases.interface';
import { CreateChequeoDto } from './dtos/create-chequeo.dto';
import { ChequeoNotFoundException } from '../../../../domain/exceptions/chequeo-not-found.exception';
import { PermisosGuard } from '../../../../../auth/infrastructure/guards/permisos.guard';
import { RequierePermiso } from '../../../../../auth/infrastructure/decorators/requiere-permiso.decorator';

@Controller('chequeos')
@UseGuards(PermisosGuard)
export class ChequeosController {
  constructor(
    @Inject(CHEQUEOS_USE_CASES)
    private readonly chequeosUseCases: IChequeosUseCases,
  ) {}

  @Get()
  @RequierePermiso('ver_chequeos')
  async getChequeos() {
    try {
      const chequeos = await this.chequeosUseCases.obtenerChequeos();
      return {
        statusCode: HttpStatus.OK,
        message: 'Chequeos obtenidos exitosamente',
        data: chequeos,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener los chequeos',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @RequierePermiso('ver_chequeos')
  async getChequeo(@Param('id', ParseIntPipe) id: number) {
    try {
      const chequeo = await this.chequeosUseCases.obtenerChequeoPorId(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Chequeo obtenido exitosamente',
        data: chequeo,
      };
    } catch (error) {
      if (error instanceof ChequeoNotFoundException) {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
          data: null,
        }, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener el chequeo',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @RequierePermiso('crear_chequeos')
  async createChequeo(@Body() createChequeoDto: CreateChequeoDto) {
    try {
      const chequeo = await this.chequeosUseCases.crearChequeo(createChequeoDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Chequeo creado exitosamente',
        data: chequeo,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error al crear el chequeo',
        data: null,
      }, HttpStatus.BAD_REQUEST);
    }
  }
}
