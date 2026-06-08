import { Controller, Get, Post, Body, Param, ParseIntPipe, Inject, HttpStatus, HttpException, Patch, Delete } from '@nestjs/common';
import { SEDES_USE_CASES, ISedesUseCases } from '../../../../domain/ports/input/sedes-use-cases.interface';
import { CreateSedeDto } from './dtos/create-sede.dto';
import { UpdateSedeDto } from './dtos/update-sede.dto';
import { SedeNotFoundException } from '../../../../domain/exceptions/sede-not-found.exception';

@Controller('sedes')
export class SedesController {
  constructor(
    @Inject(SEDES_USE_CASES)
    private readonly sedesUseCases: ISedesUseCases,
  ) {}

  @Get()
  async getSedes() {
    try {
      const sedes = await this.sedesUseCases.obtenerSedes();
      return {
        statusCode: HttpStatus.OK,
        message: 'Sedes obtenidas exitosamente',
        data: sedes,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener las sedes',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getSede(@Param('id', ParseIntPipe) id: number) {
    try {
      const sede = await this.sedesUseCases.obtenerSedePorId(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Sede obtenida exitosamente',
        data: sede,
      };
    } catch (error) {
      if (error instanceof SedeNotFoundException) {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
          data: null,
        }, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener la sede',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async createSede(@Body() createSedeDto: CreateSedeDto) {
    try {
      const Sede = await this.sedesUseCases.crearSede(createSedeDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Sede creada exitosamente',
        data: Sede,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error al crear la sede',
        data: null,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  async updateSede(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSedeDto: UpdateSedeDto,
  ) {
    try {
      const Sede = await this.sedesUseCases.actualizarSede(id, updateSedeDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Sede actualizada exitosamente',
        data: Sede,
      };
    } catch (error) {
      if (error instanceof SedeNotFoundException) {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
          data: null,
        }, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error al actualizar la sede',
        data: null,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteSede(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.sedesUseCases.eliminarSede(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Sede eliminada exitosamente',
        data: null,
      };
    } catch (error) {
      if (error instanceof SedeNotFoundException) {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
          data: null,
        }, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al eliminar la sede',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
