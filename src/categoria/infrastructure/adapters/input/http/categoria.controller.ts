import { Controller, Get, Post, Body, Param, Query, Inject, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreateCategoriaDto } from './dtos/create-categoria.dto';
import { FindCategoriaUseCase } from '../../../../domain/ports/input/find-categoria.use-case';
import { CreateCategoriaUseCase } from '../../../../domain/ports/input/create-categoria.use-case';

@ApiTags('categoria')
@ApiBearerAuth()
@Controller('categoria')
export class CategoriaController {
    constructor(
        @Inject('FindCategoriaUseCase') private readonly findUseCase: FindCategoriaUseCase,
        @Inject('CreateCategoriaUseCase') private readonly createUseCase: CreateCategoriaUseCase
    ) {}

    @Post()
    @ApiOperation({ summary: 'Crear categoria' })
    async create(@Body() dto: CreateCategoriaDto) {
        const data = await this.createUseCase.create(dto);
        return { statusCode: HttpStatus.CREATED, message: 'Creado', data };
    }

    @Get()
    @ApiOperation({ summary: 'Listar categoria paginado' })
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
