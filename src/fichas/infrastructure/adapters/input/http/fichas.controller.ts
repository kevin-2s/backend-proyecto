import { Controller, Get, Post, Body, Param, Query, Inject, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreateFichaDto } from './dtos/create-ficha.dto';
import { FindFichaUseCase } from '../../../../domain/ports/input/find-ficha.use-case';
import { CreateFichaUseCase } from '../../../../domain/ports/input/create-ficha.use-case';

@ApiTags('fichas')
@ApiBearerAuth()
@Controller('fichas')
export class FichaController {
    constructor(
        @Inject('FindFichaUseCase') private readonly findUseCase: FindFichaUseCase,
        @Inject('CreateFichaUseCase') private readonly createUseCase: CreateFichaUseCase
    ) {}

    @Post()
    @ApiOperation({ summary: 'Crear ficha' })
    async create(@Body() dto: CreateFichaDto) {
        const data = await this.createUseCase.create(dto);
        return { statusCode: HttpStatus.CREATED, message: 'Creado', data };
    }

    @Get()
    @ApiOperation({ summary: 'Listar fichas paginado' })
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
