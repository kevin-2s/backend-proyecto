import { Controller, Get, Post, Body, Patch, Param, ParseIntPipe, Inject, HttpStatus, HttpException, Query, UseGuards } from '@nestjs/common';
import { NOTIFICACIONES_USE_CASES, INotificacionesUseCases } from '../../../../domain/ports/input/notificaciones-use-cases.interface';
import { CreateNotificacionDto } from './dtos/create-notificacion.dto';
import { PermisosGuard } from '../../../../../auth/infrastructure/guards/permisos.guard';
import { RequierePermiso } from '../../../../../auth/infrastructure/decorators/requiere-permiso.decorator';

@Controller('notificaciones')
@UseGuards(PermisosGuard)
export class NotificacionesController {
  constructor(
    @Inject(NOTIFICACIONES_USE_CASES)
    private readonly notificacionesUseCases: INotificacionesUseCases,
  ) {}

  @Get()
  @RequierePermiso('ver_notificaciones')
  async getNotificaciones(@Query('id_usuario', ParseIntPipe) id_usuario: number) {
    try {
      const notificaciones = await this.notificacionesUseCases.obtenerNotificacionesUsuario(id_usuario);
      return {
        statusCode: HttpStatus.OK,
        message: 'Notificaciones obtenidas exitosamente',
        data: notificaciones,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener las notificaciones',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @RequierePermiso('ver_notificaciones')
  async createNotificacion(@Body() createDto: CreateNotificacionDto) {
    try {
      const notificacion = await this.notificacionesUseCases.crearNotificacion(createDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Notificación creada exitosamente',
        data: notificacion,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error al crear la notificación',
        data: null,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id/marcar-leida')
  @RequierePermiso('ver_notificaciones')
  async marcarLeida(@Param('id', ParseIntPipe) id: number) {
    try {
      const notificacion = await this.notificacionesUseCases.marcarNotificacionComoLeida(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Notificación marcada como leída',
        data: notificacion,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error al marcar la notificación',
        data: null,
      }, HttpStatus.BAD_REQUEST);
    }
  }
}
