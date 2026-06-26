import { Controller, Get, Post, Body, Param, ParseIntPipe, Inject, HttpStatus, HttpException, Patch, Delete, UseGuards } from '@nestjs/common';
import { INVENTARIO_USE_CASES, IInventarioUseCases } from '../../../../domain/ports/input/inventario-use-cases.interface';
import { CreateInventarioDto } from './dtos/create-inventario.dto';
import { UpdateInventarioDto } from './dtos/update-inventario.dto';
import { InventarioNotFoundException } from '../../../../domain/exceptions/inventario-not-found.exception';
import { PermisosGuard } from '../../../../../auth/infrastructure/guards/permisos.guard';
import { RolesGuard } from '../../../../../auth/infrastructure/guards/roles.guard';
import { RequierePermiso } from '../../../../../auth/infrastructure/decorators/requiere-permiso.decorator';
import { Roles } from '../../../../../auth/infrastructure/decorators/roles.decorator';

@Controller('inventario')
@UseGuards(PermisosGuard)
export class InventarioController {
  constructor(
    @Inject(INVENTARIO_USE_CASES)
    private readonly inventarioUseCases: IInventarioUseCases,
  ) {}

  @Get()
  @RequierePermiso('ver_inventario')
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

  @Get('producto/:id_producto/stock')
  @RequierePermiso('ver_inventario')
  async getStockPorProducto(@Param('id_producto', ParseIntPipe) id_producto: number) {
    try {
      const stock = await this.inventarioUseCases.obtenerStockPorProducto(id_producto);
      return { statusCode: HttpStatus.OK, message: 'Stock obtenido exitosamente', data: stock };
    } catch {
      throw new HttpException({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Error al obtener el stock', data: null }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @RequierePermiso('ver_inventario')
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
  @RequierePermiso('crear_inventario')
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

  @Patch(':id')
  @RequierePermiso('editar_inventario')
  async updateInventario(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInventarioDto: UpdateInventarioDto,
  ) {
    try {
      const inventario = await this.inventarioUseCases.actualizarInventario(id, updateInventarioDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Inventario actualizado exitosamente',
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
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error al actualizar el inventario',
        data: null,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('Administrador')
  async deleteInventario(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.inventarioUseCases.eliminarInventario(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Inventario eliminado exitosamente',
        data: null,
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
        message: 'Error al eliminar el inventario',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
