import { Controller, Get, Post, Body, Param, Query, Inject, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreateActaDto } from './dtos/create-acta.dto';
import { FindActaUseCase } from '../../../../domain/ports/input/find-acta.use-case';
import { CreateActaUseCase } from '../../../../domain/ports/input/create-acta.use-case';

@ApiTags('actas')
@ApiBearerAuth()
@Controller('actas')
export class ActaController {
    constructor(
        @Inject('FindActaUseCase') private readonly findUseCase: FindActaUseCase,
        @Inject('CreateActaUseCase') private readonly createUseCase: CreateActaUseCase
    ) {}

    @Post()
    @ApiOperation({ summary: 'Crear acta' })
    async create(@Body() dto: CreateActaDto) {
        const data = await this.createUseCase.create(dto);
        return { statusCode: HttpStatus.CREATED, message: 'Creado', data };
    }

    @Get()
    @ApiOperation({ summary: 'Listar actas paginado' })
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
