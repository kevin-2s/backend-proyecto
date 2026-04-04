import { Controller, Get, Post, Body, Param, Query, Inject, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreateReporteDto } from './dtos/create-reporte.dto';
import { FindReporteUseCase } from '../../../../domain/ports/input/find-reporte.use-case';
import { CreateReporteUseCase } from '../../../../domain/ports/input/create-reporte.use-case';

@ApiTags('reportes')
@ApiBearerAuth()
@Controller('reportes')
export class ReporteController {
    constructor(
        @Inject('FindReporteUseCase') private readonly findUseCase: FindReporteUseCase,
        @Inject('CreateReporteUseCase') private readonly createUseCase: CreateReporteUseCase
    ) {}

    @Post()
    @ApiOperation({ summary: 'Crear reporte' })
    async create(@Body() dto: CreateReporteDto) {
        const data = await this.createUseCase.create(dto);
        return { statusCode: HttpStatus.CREATED, message: 'Creado', data };
    }

    @Get()
    @ApiOperation({ summary: 'Listar reportes paginado' })
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
