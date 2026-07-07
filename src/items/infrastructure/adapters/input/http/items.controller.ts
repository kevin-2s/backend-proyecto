import { Controller, Get, Post, Body, Param, Patch, ParseIntPipe, Inject, HttpStatus, HttpException, Query, UseGuards, Req } from '@nestjs/common';
import { ITEMS_USE_CASES, IItemsUseCases } from '../../../../domain/ports/input/items-use-cases.interface';
import { CreateItemDto } from './dtos/create-item.dto';
import { UpdateEstadoItemDto } from './dtos/update-estado-item.dto';
import { UpdateItemDto } from './dtos/update-item.dto';
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

  @Get('buscar/:placa')
  @RequierePermiso('ver_items')
  async buscarPorPlaca(@Param('placa') placa: string, @Req() req: any) {
    try {
      const userId: number = Number(req.user?.userId);
      const role: string = req.user?.roles?.[0] ?? '';
      const detalle = await this.itemsUseCases.buscarPorPlaca(placa, userId, role);
      if (!detalle) {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: `No se encontró ningún ítem con la placa SENA: ${placa}`,
          data: null,
        }, HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Ítem encontrado',
        data: detalle,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al buscar el ítem por placa SENA',
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
      if ((error as any)?.code === '23505') {
        throw new HttpException({
          statusCode: HttpStatus.CONFLICT,
          message: 'La placa SENA ya está en uso por otro ítem',
          data: null,
        }, HttpStatus.CONFLICT);
      }
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error al crear el item',
        data: null,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  @RequierePermiso('editar_items')
  async updateItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    try {
      const item = await this.itemsUseCases.actualizarItem(id, updateItemDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Item actualizado exitosamente',
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
      if ((error as any)?.code === '23505') {
        throw new HttpException({
          statusCode: HttpStatus.CONFLICT,
          message: 'La placa SENA ya está en uso por otro ítem',
          data: null,
        }, HttpStatus.CONFLICT);
      }
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error al actualizar el item',
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
