import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe, Inject, HttpStatus, HttpException, UseGuards } from '@nestjs/common';
import { PRODUCTOS_USE_CASES, IProductosUseCases } from '../../../../domain/ports/input/productos-use-cases.interface';
import { CreateProductoDto } from './dtos/create-producto.dto';
import { UpdateProductoDto } from './dtos/update-producto.dto';
import { ProductoNotFoundException } from '../../../../domain/exceptions/producto-not-found.exception';
import { PermisosGuard } from '../../../../../auth/infrastructure/guards/permisos.guard';
import { RequierePermiso } from '../../../../../auth/infrastructure/decorators/requiere-permiso.decorator';

@Controller('productos')
@UseGuards(PermisosGuard)
export class ProductosController {
  constructor(
    @Inject(PRODUCTOS_USE_CASES)
    private readonly productosUseCases: IProductosUseCases,
  ) {}

  @Get()
  @RequierePermiso('ver_productos')
  async getProductos() {
    try {
      const productos = await this.productosUseCases.obtenerProductos();
      return {
        statusCode: HttpStatus.OK,
        message: 'Productos obtenidos exitosamente',
        data: productos,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener los productos',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @RequierePermiso('ver_productos')
  async getProducto(@Param('id', ParseIntPipe) id: number) {
    try {
      const producto = await this.productosUseCases.obtenerProductoPorId(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Producto obtenido exitosamente',
        data: producto,
      };
    } catch (error) {
      if (error instanceof ProductoNotFoundException) {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
          data: null,
        }, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener el producto',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @RequierePermiso('crear_productos')
  async createProducto(@Body() createProductoDto: CreateProductoDto) {
    try {
      const result = await this.productosUseCases.crearProducto(createProductoDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: `Producto creado exitosamente con ${result.items_generados.length} items`,
        data: {
          producto: result.producto,
          items_generados: result.items_generados,
        },
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error al crear el producto',
        data: null,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  @RequierePermiso('editar_productos')
  async updateProducto(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductoDto: UpdateProductoDto,
  ) {
    try {
      const producto = await this.productosUseCases.actualizarProducto(id, updateProductoDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Producto actualizado exitosamente',
        data: producto,
      };
    } catch (error) {
      if (error instanceof ProductoNotFoundException) {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
          data: null,
        }, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error al actualizar el producto',
        data: null,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @RequierePermiso('eliminar_productos')
  async deleteProducto(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.productosUseCases.eliminarProducto(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Producto eliminado exitosamente',
        data: null,
      };
    } catch (error) {
      if (error instanceof ProductoNotFoundException) {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
          data: null,
        }, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al eliminar el producto',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
