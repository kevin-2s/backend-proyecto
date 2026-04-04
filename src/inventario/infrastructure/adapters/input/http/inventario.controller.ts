import { Controller, Get, Post, Body, Param, Query, Inject, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreateInventarioDto } from './dtos/create-inventario.dto';
import { FindInventarioUseCase } from '../../../../domain/ports/input/find-inventario.use-case';
import { CreateInventarioUseCase } from '../../../../domain/ports/input/create-inventario.use-case';

@ApiTags('inventario')
@ApiBearerAuth()
@Controller('inventario')
export class InventarioController {
    constructor(
        @Inject('FindInventarioUseCase') private readonly findUseCase: FindInventarioUseCase,
        @Inject('CreateInventarioUseCase') private readonly createUseCase: CreateInventarioUseCase
    ) {}

    @Post()
    @ApiOperation({ summary: 'Crear inventario' })
    async create(@Body() dto: CreateInventarioDto) {
        const data = await this.createUseCase.create(dto);
        return { statusCode: HttpStatus.CREATED, message: 'Creado', data };
    }

    @Get()
    @ApiOperation({ summary: 'Listar inventario paginado' })
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
