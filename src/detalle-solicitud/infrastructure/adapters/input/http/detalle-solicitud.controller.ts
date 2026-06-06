import { Controller, Get, Post, Body, Inject, HttpStatus, HttpException, UseGuards } from '@nestjs/common';
import { DETALLE_SOLICITUD_USE_CASES, IDetalleSolicitudUseCases } from '../../../../domain/ports/input/detalle-solicitud-use-cases.interface';
import { CreateDetalleSolicitudDto } from './dtos/create-detalle-solicitud.dto';
import { PermisosGuard } from '../../../../../auth/infrastructure/guards/permisos.guard';
import { RequierePermiso } from '../../../../../auth/infrastructure/decorators/requiere-permiso.decorator';

@Controller('detalle-solicitud')
@UseGuards(PermisosGuard)
export class DetalleSolicitudController {
  constructor(
    @Inject(DETALLE_SOLICITUD_USE_CASES)
    private readonly detalleSolicitudUseCases: IDetalleSolicitudUseCases,
  ) {}

  @Get()
  @RequierePermiso('ver_solicitudes')
  async getDetalles() {
    try {
      const detalles = await this.detalleSolicitudUseCases.obtenerDetalles();
      return {
        statusCode: HttpStatus.OK,
        message: 'Detalles obtenidos exitosamente',
        data: detalles,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener los detalles',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @RequierePermiso('crear_solicitudes')
  async createDetalle(@Body() createDto: CreateDetalleSolicitudDto) {
    try {
      const detalle = await this.detalleSolicitudUseCases.crearDetalle(createDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Detalle creado exitosamente',
        data: detalle,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error al crear el detalle',
        data: null,
      }, HttpStatus.BAD_REQUEST);
    }
  }
}
