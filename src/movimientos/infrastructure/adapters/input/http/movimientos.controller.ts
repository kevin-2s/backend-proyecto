import { Controller, Get, Post, Body, Param, ParseIntPipe, Inject, HttpStatus, HttpException, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { MOVIMIENTOS_USE_CASES, IMovimientosUseCases } from '../../../../domain/ports/input/movimientos-use-cases.interface';
import { CreateMovimientoDto } from './dtos/create-movimiento.dto';
import { MovimientoNotFoundException } from '../../../../domain/exceptions/movimiento-not-found.exception';
import { PermisosGuard } from '../../../../../auth/infrastructure/guards/permisos.guard';
import { RequierePermiso } from '../../../../../auth/infrastructure/decorators/requiere-permiso.decorator';

@Controller('movimientos')
@UseGuards(PermisosGuard)
export class MovimientosController {
  constructor(
    @Inject(MOVIMIENTOS_USE_CASES)
    private readonly movimientosUseCases: IMovimientosUseCases,
  ) {}

  @Get()
  @RequierePermiso('ver_movimientos')
  async getMovimientos() {
    try {
      const movimientos = await this.movimientosUseCases.obtenerMovimientos();
      return {
        statusCode: HttpStatus.OK,
        message: 'Movimientos obtenidos exitosamente',
        data: movimientos,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener los movimientos',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('reporte')
  @RequierePermiso('ver_reportes')
  @ApiOperation({ summary: 'Generar reporte de movimientos por fecha y tipo' })
  @ApiQuery({ name: 'fechaInicio', required: true, example: '2026-01-01' })
  @ApiQuery({ name: 'fechaFin', required: true, example: '2026-04-21' })
  @ApiQuery({ name: 'tipo', required: false, enum: ['ENTRADA', 'SALIDA', 'PRESTAMO', 'DEVOLUCION', 'TRANSFERENCIA'] })
  async generarReporte(
    @Query('fechaInicio') fechaInicio: string,
    @Query('fechaFin') fechaFin: string,
    @Query('tipo') tipo?: string,
  ) {
    try {
      const data = await this.movimientosUseCases.generarReporte(fechaInicio, fechaFin, tipo);
      return {
        statusCode: HttpStatus.OK,
        message: 'Reporte generado exitosamente',
        data,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al generar el reporte',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @RequierePermiso('ver_movimientos')
  async getMovimiento(@Param('id', ParseIntPipe) id: number) {
    try {
      const movimiento = await this.movimientosUseCases.obtenerMovimientoPorId(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Movimiento obtenido exitosamente',
        data: movimiento,
      };
    } catch (error) {
      if (error instanceof MovimientoNotFoundException) {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
          data: null,
        }, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener el movimiento',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @RequierePermiso('crear_movimientos')
  async createMovimiento(@Body() createMovimientoDto: CreateMovimientoDto) {
    try {
      const movimiento = await this.movimientosUseCases.crearMovimiento({
        ...createMovimientoDto,
        observacion: createMovimientoDto.observacion ?? null,
      });
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Movimiento creado exitosamente',
        data: movimiento,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error al crear el movimiento',
        data: null,
      }, HttpStatus.BAD_REQUEST);
    }
  }
}
