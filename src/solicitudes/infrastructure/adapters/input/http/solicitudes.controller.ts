import { Controller, Get, Post, Body, Param, Patch, ParseIntPipe, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { SOLICITUDES_USE_CASES, ISolicitudesUseCases } from '../../../../domain/ports/input/solicitudes-use-cases.interface';
import { CreateSolicitudDto } from './dtos/create-solicitud.dto';
import { AprobarSolicitudDto } from './dtos/aprobar-solicitud.dto';
import { EstadoSolicitud } from '../../../../domain/entities/solicitud.domain.entity';
import { SolicitudNotFoundException } from '../../../../domain/exceptions/solicitud-not-found.exception';

@Controller('solicitudes')
export class SolicitudesController {
  constructor(
    @Inject(SOLICITUDES_USE_CASES)
    private readonly solicitudesUseCases: ISolicitudesUseCases,
  ) {}

  @Get()
  async getSolicitudes() {
    try {
      const solicitudes = await this.solicitudesUseCases.obtenerSolicitudes();
      return {
        statusCode: HttpStatus.OK,
        message: 'Solicitudes obtenidas exitosamente',
        data: solicitudes,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener las solicitudes',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getSolicitud(@Param('id', ParseIntPipe) id: number) {
    try {
      const solicitud = await this.solicitudesUseCases.obtenerSolicitudPorId(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Solicitud obtenida exitosamente',
        data: solicitud,
      };
    } catch (error) {
      if (error instanceof SolicitudNotFoundException) {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
          data: null,
        }, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener la solicitud',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async createSolicitud(@Body() createSolicitudDto: CreateSolicitudDto) {
    try {
      const solicitud = await this.solicitudesUseCases.crearSolicitud(createSolicitudDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Solicitud creada exitosamente',
        data: solicitud,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error al crear la solicitud',
        data: null,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id/aprobar')
  async aprobarSolicitud(@Param('id', ParseIntPipe) id: number, @Body() aprobarDto: AprobarSolicitudDto) {
    try {
      const solicitud = await this.solicitudesUseCases.cambiarEstadoSolicitud(id, EstadoSolicitud.APROBADA, aprobarDto.id_usuario_aprueba);
      return { statusCode: HttpStatus.OK, message: 'Solicitud aprobada', data: solicitud };
    } catch (error) {
      throw new HttpException({ statusCode: HttpStatus.BAD_REQUEST, message: 'Error al aprobar', data: null }, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id/rechazar')
  async rechazarSolicitud(@Param('id', ParseIntPipe) id: number, @Body() aprobarDto: AprobarSolicitudDto) {
    try {
      const solicitud = await this.solicitudesUseCases.cambiarEstadoSolicitud(id, EstadoSolicitud.RECHAZADA, aprobarDto.id_usuario_aprueba);
      return { statusCode: HttpStatus.OK, message: 'Solicitud rechazada', data: solicitud };
    } catch (error) {
      throw new HttpException({ statusCode: HttpStatus.BAD_REQUEST, message: 'Error al rechazar', data: null }, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id/entregar')
  async entregarSolicitud(@Param('id', ParseIntPipe) id: number) {
    try {
      const solicitud = await this.solicitudesUseCases.cambiarEstadoSolicitud(id, EstadoSolicitud.ENTREGADA);
      return { statusCode: HttpStatus.OK, message: 'Solicitud entregada', data: solicitud };
    } catch (error) {
      throw new HttpException({ statusCode: HttpStatus.BAD_REQUEST, message: 'Error al entregar', data: null }, HttpStatus.BAD_REQUEST);
    }
  }
}
