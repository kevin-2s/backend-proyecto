import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  ParseIntPipe,
  HttpStatus,
  HttpException,
  Inject,
} from '@nestjs/common';
import { PRESTAMOS_USE_CASES, IPrestamosUseCases } from '../../../../domain/ports/input/prestamos-use-cases.interface';
import { CreatePrestamoDto, DevolucionDto } from './dtos/prestamo.dto';

@Controller('prestamos')
export class PrestamosController {
  constructor(
    @Inject(PRESTAMOS_USE_CASES)
    private readonly prestamosUseCases: IPrestamosUseCases,
  ) {}

  @Get()
  async getAll() {
    try {
      const data = await this.prestamosUseCases.obtenerTodos();
      return { statusCode: HttpStatus.OK, message: 'Préstamos obtenidos', data };
    } catch (error) {
      throw new HttpException({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Error al obtener préstamos' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('activos')
  async getActivos() {
    try {
      const data = await this.prestamosUseCases.obtenerActivos();
      return { statusCode: HttpStatus.OK, message: 'Préstamos activos', data };
    } catch (error) {
      throw new HttpException({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Error al obtener préstamos activos' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    try {
      const data = await this.prestamosUseCases.obtenerPorId(id);
      if (!data) throw new HttpException({ statusCode: HttpStatus.NOT_FOUND, message: 'Préstamo no encontrado' }, HttpStatus.NOT_FOUND);
      return { statusCode: HttpStatus.OK, message: 'Préstamo encontrado', data };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Error al obtener préstamo' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async create(@Body() dto: CreatePrestamoDto) {
    try {
      const data = await this.prestamosUseCases.crearPrestamo({
        fecha_devolucion_esperada: new Date(dto.fecha_devolucion_esperada),
        observacion: dto.observacion,
        id_item: dto.id_item,
        id_usuario_solicitante: dto.id_usuario_solicitante,
        id_usuario_responsable: dto.id_usuario_responsable,
      });
      return { statusCode: HttpStatus.CREATED, message: 'Préstamo creado exitosamente', data };
    } catch (error) {
      throw new HttpException({ statusCode: HttpStatus.BAD_REQUEST, message: 'Error al crear el préstamo' }, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id/devolucion')
  async registrarDevolucion(@Param('id', ParseIntPipe) id: number, @Body() dto: DevolucionDto) {
    try {
      const data = await this.prestamosUseCases.registrarDevolucion(id, dto.observacion);
      return { statusCode: HttpStatus.OK, message: 'Devolución registrada exitosamente', data };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Error al registrar devolución' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
