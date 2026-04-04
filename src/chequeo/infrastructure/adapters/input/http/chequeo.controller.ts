import { Controller, Get, Post, Body, Param, Query, Inject, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreateChequeoDto } from './dtos/create-chequeo.dto';
import { FindChequeoUseCase } from '../../../../domain/ports/input/find-chequeo.use-case';
import { CreateChequeoUseCase } from '../../../../domain/ports/input/create-chequeo.use-case';

@ApiTags('chequeo')
@ApiBearerAuth()
@Controller('chequeo')
export class ChequeoController {
    constructor(
        @Inject('FindChequeoUseCase') private readonly findUseCase: FindChequeoUseCase,
        @Inject('CreateChequeoUseCase') private readonly createUseCase: CreateChequeoUseCase
    ) {}

    @Post()
    @ApiOperation({ summary: 'Crear chequeo' })
    async create(@Body() dto: CreateChequeoDto) {
        const data = await this.createUseCase.create(dto);
        return { statusCode: HttpStatus.CREATED, message: 'Creado', data };
    }

    @Get()
    @ApiOperation({ summary: 'Listar chequeo paginado' })
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
