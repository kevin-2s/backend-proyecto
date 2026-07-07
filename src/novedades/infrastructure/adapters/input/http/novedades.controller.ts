import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe, Inject, HttpStatus, HttpException, UseGuards, Req } from '@nestjs/common';
import { NOVEDADES_USE_CASES, INovedadesUseCases } from '../../../../domain/ports/input/novedades-use-cases.interface';
import { CreateNovedadDto } from './dtos/create-novedad.dto';
import { UpdateNovedadDto } from './dtos/update-novedad.dto';
import { NovedadNotFoundException } from '../../../../domain/exceptions/novedad-not-found.exception';
import { PermisosGuard } from '../../../../../auth/infrastructure/guards/permisos.guard';

@Controller('novedades')
@UseGuards(PermisosGuard)
export class NovedadesController {
  constructor(
    @Inject(NOVEDADES_USE_CASES)
    private readonly useCases: INovedadesUseCases,
  ) {}

  @Get()
  async getAll() {
    try {
      const data = await this.useCases.obtenerNovedades();
      return { statusCode: HttpStatus.OK, message: 'Novedades obtenidas exitosamente', data };
    } catch {
      throw new HttpException({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Error al obtener novedades', data: null }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('item/:id_item')
  async getByItem(@Param('id_item', ParseIntPipe) id_item: number) {
    try {
      const data = await this.useCases.obtenerNovedadesPorItem(id_item);
      return { statusCode: HttpStatus.OK, message: 'Novedades del item obtenidas', data };
    } catch {
      throw new HttpException({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Error al obtener novedades del item', data: null }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async create(@Body() dto: CreateNovedadDto, @Req() req: any) {
    try {
      const userId = Number(req.user?.userId);
      const role: string = req.user?.roles?.[0] ?? '';
      const data = await this.useCases.crearNovedad(dto, userId, role);
      return { statusCode: HttpStatus.CREATED, message: 'Novedad registrada exitosamente', data };
    } catch (error) {
      if ((error as Error).message === 'FORBIDDEN') {
        throw new HttpException({ statusCode: HttpStatus.FORBIDDEN, message: 'Solo puedes registrar novedades de ítems que pertenecen a tu bodega', data: null }, HttpStatus.FORBIDDEN);
      }
      throw new HttpException({ statusCode: HttpStatus.BAD_REQUEST, message: 'Error al registrar la novedad', data: null }, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  async updateEstado(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateNovedadDto, @Req() req: any) {
    try {
      const userId = Number(req.user?.userId);
      const role: string = req.user?.roles?.[0] ?? '';
      const data = await this.useCases.actualizarEstado(id, dto.estado, userId, role);
      return { statusCode: HttpStatus.OK, message: 'Estado actualizado', data };
    } catch (error) {
      if ((error as Error).message === 'FORBIDDEN') {
        throw new HttpException({ statusCode: HttpStatus.FORBIDDEN, message: 'Solo el responsable de la bodega puede actualizar el estado de esta novedad', data: null }, HttpStatus.FORBIDDEN);
      }
      if (error instanceof NovedadNotFoundException) {
        throw new HttpException({ statusCode: HttpStatus.NOT_FOUND, message: error.message, data: null }, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({ statusCode: HttpStatus.BAD_REQUEST, message: 'Error al actualizar estado', data: null }, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.useCases.eliminarNovedad(id);
      return { statusCode: HttpStatus.OK, message: 'Novedad eliminada', data: null };
    } catch (error) {
      if (error instanceof NovedadNotFoundException) {
        throw new HttpException({ statusCode: HttpStatus.NOT_FOUND, message: error.message, data: null }, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Error al eliminar la novedad', data: null }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
