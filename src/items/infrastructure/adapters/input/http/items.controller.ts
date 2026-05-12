import { Controller, Get, Post, Body, Param, Patch, ParseIntPipe, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { ITEMS_USE_CASES, IItemsUseCases } from '../../../../domain/ports/input/items-use-cases.interface';
import { CreateItemDto } from './dtos/create-item.dto';
import { UpdateEstadoItemDto } from './dtos/update-estado-item.dto';
import { ItemNotFoundException } from '../../../../domain/exceptions/item-not-found.exception';

@Controller('items')
export class ItemsController {
  constructor(
    @Inject(ITEMS_USE_CASES)
    private readonly itemsUseCases: IItemsUseCases,
  ) {}

  @Get()
  async getItems() {
    try {
      const items = await this.itemsUseCases.obtenerItems();
      return {
        statusCode: HttpStatus.OK,
        message: 'Items obtenidos exitosamente',
        data: items,
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
