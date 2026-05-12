import { Controller, Get, Post, Body, Param, ParseIntPipe, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { INVENTARIO_USE_CASES, IInventarioUseCases } from '../../../../domain/ports/input/inventario-use-cases.interface';
import { CreateInventarioDto } from './dtos/create-inventario.dto';
import { InventarioNotFoundException } from '../../../../domain/exceptions/inventario-not-found.exception';

@Controller('inventario')
export class InventarioController {
  constructor(
    @Inject(INVENTARIO_USE_CASES)
    private readonly inventarioUseCases: IInventarioUseCases,
  ) {}

  @Get()
  async getInventarios() {
    try {
      const inventarios = await this.inventarioUseCases.obtenerInventarios();
      return {
        statusCode: HttpStatus.OK,
        message: 'Inventario obtenido exitosamente',
        data: inventarios,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener el inventario',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getInventario(@Param('id', ParseIntPipe) id: number) {
    try {
      const inventario = await this.inventarioUseCases.obtenerInventarioPorId(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Inventario obtenido exitosamente',
        data: inventario,
      };
    } catch (error) {
      if (error instanceof InventarioNotFoundException) {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
          data: null,
        }, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener el inventario',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async createInventario(@Body() createInventarioDto: CreateInventarioDto) {
    try {
      const inventario = await this.inventarioUseCases.crearInventario(createInventarioDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Inventario creado exitosamente',
        data: inventario,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error al crear el inventario',
        data: null,
      }, HttpStatus.BAD_REQUEST);
    }
  }
}
