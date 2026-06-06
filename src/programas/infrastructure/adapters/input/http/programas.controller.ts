import { Controller, Get, Post, Body, Param, ParseIntPipe, Inject, HttpStatus, HttpException, Patch, Delete, UseGuards } from '@nestjs/common';
import { PROGRAMAS_USE_CASES, IProgramasUseCases } from '../../../../domain/ports/input/programas-use-cases.interface';
import { CreateProgramaDto } from './dtos/create-programa.dto';
import { UpdateProgramaDto } from './dtos/update-programa.dto';
import { ProgramaNotFoundException } from '../../../../domain/exceptions/programa-not-found.exception';
import { PermisosGuard } from '../../../../../auth/infrastructure/guards/permisos.guard';
import { RolesGuard } from '../../../../../auth/infrastructure/guards/roles.guard';
import { RequierePermiso } from '../../../../../auth/infrastructure/decorators/requiere-permiso.decorator';
import { Roles } from '../../../../../auth/infrastructure/decorators/roles.decorator';

@Controller('programas')
@UseGuards(PermisosGuard)
export class ProgramasController {
  constructor(
    @Inject(PROGRAMAS_USE_CASES)
    private readonly programasUseCases: IProgramasUseCases,
  ) {}

  @Get()
  @RequierePermiso('ver_sitios')
  async getProgramas() {
    try {
      const programas = await this.programasUseCases.obtenerProgramas();
      return {
        statusCode: HttpStatus.OK,
        message: 'Programas obtenidos exitosamente',
        data: programas,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener los programas',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @RequierePermiso('ver_sitios')
  async getPrograma(@Param('id', ParseIntPipe) id: number) {
    try {
      const programa = await this.programasUseCases.obtenerProgramaPorId(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Programa obtenido exitosamente',
        data: programa,
      };
    } catch (error) {
      if (error instanceof ProgramaNotFoundException) {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
          data: null,
        }, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener el programa',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('Administrador')
  async createPrograma(@Body() createProgramaDto: CreateProgramaDto) {
    try {
      const programa = await this.programasUseCases.crearPrograma(createProgramaDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Programa creado exitosamente',
        data: programa,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error al crear el programa',
        data: null,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('Administrador')
  async updatePrograma(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProgramaDto: UpdateProgramaDto,
  ) {
    try {
      const programa = await this.programasUseCases.actualizarPrograma(id, updateProgramaDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Programa actualizado exitosamente',
        data: programa,
      };
    } catch (error) {
      if (error instanceof ProgramaNotFoundException) {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
          data: null,
        }, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error al actualizar el programa',
        data: null,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('Administrador')
  async deletePrograma(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.programasUseCases.eliminarPrograma(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Programa eliminado exitosamente',
        data: null,
      };
    } catch (error) {
      if (error instanceof ProgramaNotFoundException) {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
          data: null,
        }, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al eliminar el programa',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
