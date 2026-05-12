import { Controller, Get, Post, Body, Param, ParseIntPipe, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { CATEGORIAS_USE_CASES, ICategoriasUseCases } from '../../../../domain/ports/input/categorias-use-cases.interface';
import { CreateCategoriaDto } from './dtos/create-categoria.dto';
import { CategoriaNotFoundException } from '../../../../domain/exceptions/categoria-not-found.exception';

@Controller('categorias')
export class CategoriasController {
  constructor(
    @Inject(CATEGORIAS_USE_CASES)
    private readonly categoriasUseCases: ICategoriasUseCases,
  ) {}

  @Get()
  async getCategorias() {
    try {
      const categorias = await this.categoriasUseCases.obtenerCategorias();
      return {
        statusCode: HttpStatus.OK,
        message: 'Categorías obtenidas exitosamente',
        data: categorias,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener las categorías',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getCategoria(@Param('id', ParseIntPipe) id: number) {
    try {
      const categoria = await this.categoriasUseCases.obtenerCategoriaPorId(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Categoría obtenida exitosamente',
        data: categoria,
      };
    } catch (error) {
      if (error instanceof CategoriaNotFoundException) {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
          data: null,
        }, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener la categoría',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async createCategoria(@Body() createCategoriaDto: CreateCategoriaDto) {
    try {
      const categoria = await this.categoriasUseCases.crearCategoria(createCategoriaDto.nombre);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Categoría creada exitosamente',
        data: categoria,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error al crear la categoría',
        data: null,
      }, HttpStatus.BAD_REQUEST);
    }
  }
}
