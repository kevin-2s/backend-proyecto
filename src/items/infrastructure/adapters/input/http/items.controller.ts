import { Controller, Get, Post, Body, Param, Patch, ParseIntPipe, Inject, HttpStatus, HttpException, Query, UseGuards } from '@nestjs/common';
import { ITEMS_USE_CASES, IItemsUseCases } from '../../../../domain/ports/input/items-use-cases.interface';
import { CreateItemDto } from './dtos/create-item.dto';
import { UpdateEstadoItemDto } from './dtos/update-estado-item.dto';
import { ItemNotFoundException } from '../../../../domain/exceptions/item-not-found.exception';
import { PermisosGuard } from '../../../../../auth/infrastructure/guards/permisos.guard';
import { RequierePermiso } from '../../../../../auth/infrastructure/decorators/requiere-permiso.decorator';

@Controller('items')
@UseGuards(PermisosGuard)
export class ItemsController {
  constructor(
    @Inject(ITEMS_USE_CASES)
    private readonly itemsUseCases: IItemsUseCases,
  ) {}

  @Get()
  @RequierePermiso('ver_items')
  async getItems(@Query('id_producto') id_producto?: string) {
    try {
      const items = await this.itemsUseCases.obtenerItems();
      const filtered = id_producto
        ? items.filter(item => item.id_producto === parseInt(id_producto, 10))
        : items;
      return {
        statusCode: HttpStatus.OK,
        message: 'Items obtenidos exitosamente',
        data: filtered,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener los items',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @RequierePermiso('ver_items')
  async getItem(@Param('id', ParseIntPipe) id: number) {
    try {
      const item = await this.itemsUseCases.obtenerItemPorId(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Item obtenido exitosamente',
        data: item,
      };
    } catch (error) {
      if (error instanceof ItemNotFoundException) {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
          data: null,
        }, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener el item',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @RequierePermiso('crear_items')
  async createItem(@Body() createItemDto: CreateItemDto) {
    try {
      const item = await this.itemsUseCases.crearItem(createItemDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Item creado exitosamente',
        data: item,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error al crear el item',
        data: null,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id/estado')
  @RequierePermiso('editar_items')
  async updateEstadoItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEstadoItemDto: UpdateEstadoItemDto,
  ) {
    try {
      const item = await this.itemsUseCases.actualizarEstadoItem(id, updateEstadoItemDto.estado);
      return {
        statusCode: HttpStatus.OK,
        message: 'Estado del item actualizado exitosamente',
        data: item,
      };
    } catch (error) {
      if (error instanceof ItemNotFoundException) {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
          data: null,
        }, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error al actualizar el estado del item',
        data: null,
      }, HttpStatus.BAD_REQUEST);
    }
  }
}
