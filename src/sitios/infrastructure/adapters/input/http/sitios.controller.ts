import { Controller, Get, Post, Body, Param, Query, Inject, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreateSitioDto } from './dtos/create-sitio.dto';
import { FindSitioUseCase } from '../../../../domain/ports/input/find-sitio.use-case';
import { CreateSitioUseCase } from '../../../../domain/ports/input/create-sitio.use-case';

@ApiTags('sitios')
@ApiBearerAuth()
@Controller('sitios')
export class SitioController {
    constructor(
        @Inject('FindSitioUseCase') private readonly findUseCase: FindSitioUseCase,
        @Inject('CreateSitioUseCase') private readonly createUseCase: CreateSitioUseCase
    ) {}

    @Post()
    @ApiOperation({ summary: 'Crear sitio' })
    async create(@Body() dto: CreateSitioDto) {
        const data = await this.createUseCase.create(dto);
        return { statusCode: HttpStatus.CREATED, message: 'Creado', data };
    }

    @Get()
    @ApiOperation({ summary: 'Listar sitios paginado' })
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
