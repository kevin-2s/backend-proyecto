import { Controller, Get, Post, Body, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { DETALLE_SOLICITUD_USE_CASES, IDetalleSolicitudUseCases } from '../../../../domain/ports/input/detalle-solicitud-use-cases.interface';
import { CreateDetalleSolicitudDto } from './dtos/create-detalle-solicitud.dto';

@Controller('detalle-solicitud')
export class DetalleSolicitudController {
  constructor(
    @Inject(DETALLE_SOLICITUD_USE_CASES)
    private readonly detalleSolicitudUseCases: IDetalleSolicitudUseCases,
  ) {}

  @Get()
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
