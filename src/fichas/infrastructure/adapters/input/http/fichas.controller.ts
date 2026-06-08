import { Controller, Get, Post, Put, Body, Param, ParseIntPipe, Inject, HttpStatus, HttpException, Delete, UseGuards } from '@nestjs/common';
import { FICHAS_USE_CASES, IFichasUseCases } from '../../../../domain/ports/input/fichas-use-cases.interface';
import { CreateFichaDto } from './dtos/create-ficha.dto';
import { UpdateFichaDto } from './dtos/update-ficha.dto';
import { FichaNotFoundException } from '../../../../domain/exceptions/ficha-not-found.exception';
import { PermisosGuard } from '../../../../../auth/infrastructure/guards/permisos.guard';
import { RolesGuard } from '../../../../../auth/infrastructure/guards/roles.guard';
import { RequierePermiso } from '../../../../../auth/infrastructure/decorators/requiere-permiso.decorator';
import { Roles } from '../../../../../auth/infrastructure/decorators/roles.decorator';

@Controller('fichas')
@UseGuards(PermisosGuard)
export class FichasController {
  constructor(
    @Inject(FICHAS_USE_CASES)
    private readonly fichasUseCases: IFichasUseCases,
  ) {}

  @Get()
  @RequierePermiso('ver_fichas')
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
  @RequierePermiso('ver_fichas')
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
  @UseGuards(RolesGuard)
  @Roles('Administrador')
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

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles('Administrador')
  async updateFicha(@Param('id', ParseIntPipe) id: number, @Body() updateFichaDto: UpdateFichaDto) {
    try {
      const ficha = await this.fichasUseCases.actualizarFicha(id, updateFichaDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Ficha actualizada exitosamente',
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
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error al actualizar la ficha',
        data: null,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('Administrador')
  async deleteFicha(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.fichasUseCases.eliminarFicha(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Ficha eliminada exitosamente',
        data: null,
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
        message: 'Error al eliminar la ficha',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
