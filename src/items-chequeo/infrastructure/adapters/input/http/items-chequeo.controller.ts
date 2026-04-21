import { Controller, Get, Post, Body, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { ITEMS_CHEQUEO_USE_CASES, IItemsChequeoUseCases } from '../../../../domain/ports/input/items-chequeo-use-cases.interface';
import { CreateItemChequeoDto } from './dtos/create-item-chequeo.dto';

@Controller('items-chequeo')
export class ItemsChequeoController {
  constructor(
    @Inject(ITEMS_CHEQUEO_USE_CASES)
    private readonly itemsChequeoUseCases: IItemsChequeoUseCases,
  ) {}

  @Get()
  async getItemsChequeo() {
    try {
      const items = await this.itemsChequeoUseCases.obtenerItemsChequeo();
      return {
        statusCode: HttpStatus.OK,
        message: 'Items de chequeo obtenidos exitosamente',
        data: items,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener los items de chequeo',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async createItemChequeo(@Body() createDto: CreateItemChequeoDto) {
    try {
      const item = await this.itemsChequeoUseCases.crearItemChequeo(createDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Item de chequeo creado exitosamente',
        data: item,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error al crear el item de chequeo',
        data: null,
      }, HttpStatus.BAD_REQUEST);
    }
  }
}
