import { Controller, Get, Post, Body, Param, Query, Inject, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CrearProductoDto } from './dtos/crear-producto.dto';
import { FindProductoUseCase } from '../../../../domain/ports/input/find-producto.use-case';
import { CreateProductoUseCase } from '../../../../domain/ports/input/create-producto.use-case';

@ApiTags('productos')
@ApiBearerAuth()
@Controller('productos')
export class ProductoController {
    constructor(
        @Inject('FindProductoUseCase') private readonly findUseCase: FindProductoUseCase,
        @Inject('CreateProductoUseCase') private readonly createUseCase: CreateProductoUseCase
    ) {}

    @Post()
    @ApiOperation({ summary: 'Crear producto' })
    async create(@Body() dto: CrearProductoDto) {
        const data = await this.createUseCase.create(dto);
        return { statusCode: HttpStatus.CREATED, message: 'Creado', data };
    }

    @Get()
    @ApiOperation({ summary: 'Listar productos paginado' })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    async findAll(@Query('page') page: string = '1', @Query('limit') limit: string = '10') {
        const paginatedData = await this.findUseCase.findAll(parseInt(page, 10), parseInt(limit, 10));
        return { statusCode: HttpStatus.OK, message: 'Listado', data: paginatedData.data, total: paginatedData.total, page: paginatedData.page, limit: paginatedData.limit };
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener por ID' })
    async findById(@Param('id') id: string) {
        const data = await this.findUseCase.findById(id);
        return { statusCode: HttpStatus.OK, message: 'Encontrado', data };
    }
}
