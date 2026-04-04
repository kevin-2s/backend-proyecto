import { Controller, Get, Post, Body, Param, Query, Inject, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreateAsignaDto } from './dtos/create-asigna.dto';
import { FindAsignaUseCase } from '../../../../domain/ports/input/find-asigna.use-case';
import { CreateAsignaUseCase } from '../../../../domain/ports/input/create-asigna.use-case';

@ApiTags('asignaciones')
@ApiBearerAuth()
@Controller('asignaciones')
export class AsignaController {
    constructor(
        @Inject('FindAsignaUseCase') private readonly findUseCase: FindAsignaUseCase,
        @Inject('CreateAsignaUseCase') private readonly createUseCase: CreateAsignaUseCase
    ) {}

    @Post()
    @ApiOperation({ summary: 'Crear asigna' })
    async create(@Body() dto: CreateAsignaDto) {
        const data = await this.createUseCase.create(dto);
        return { statusCode: HttpStatus.CREATED, message: 'Creado', data };
    }

    @Get()
    @ApiOperation({ summary: 'Listar asignaciones paginado' })
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
