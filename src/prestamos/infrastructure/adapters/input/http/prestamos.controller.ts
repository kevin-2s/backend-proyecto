import { Controller, Get, Post, Body, Param, Put, ParseIntPipe } from '@nestjs/common';
import { PrestamosService } from '../../../../application/services/prestamos.service';
import { CreatePrestamoDto } from './dtos/create-prestamo.dto';
import { RegistrarDevolucionDto } from './dtos/registrar-devolucion.dto';

@Controller('prestamos')
export class PrestamosController {
  constructor(private readonly prestamosService: PrestamosService) {}

  @Post()
  async create(@Body() dto: CreatePrestamoDto) {
    return await this.prestamosService.crearPrestamo(dto);
  }

  @Get()
  async findAll() {
    return await this.prestamosService.getPrestamos();
  }

  @Get('activos')
  async findActivos() {
    return await this.prestamosService.getPrestamosActivos();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.prestamosService.getPrestamoById(id);
  }

  @Put(':id/devolver')
  async registrarDevolucion(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: RegistrarDevolucionDto,
  ) {
    return await this.prestamosService.registrarDevolucion(id, dto);
  }
}
