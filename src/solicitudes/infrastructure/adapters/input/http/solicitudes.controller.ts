import { Controller, Get, Post, Body, Param, Query, Inject, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreateSolicitudDto } from './dtos/create-solicitud.dto';
import { FindSolicitudUseCase } from '../../../../domain/ports/input/find-solicitud.use-case';
import { CreateSolicitudUseCase } from '../../../../domain/ports/input/create-solicitud.use-case';

@ApiTags('solicitudes')
@ApiBearerAuth()
@Controller('solicitudes')
export class SolicitudController {
    constructor(
        @Inject('FindSolicitudUseCase') private readonly findUseCase: FindSolicitudUseCase,
        @Inject('CreateSolicitudUseCase') private readonly createUseCase: CreateSolicitudUseCase
    ) {}

    @Post()
    @ApiOperation({ summary: 'Crear solicitud' })
    async create(@Body() dto: CreateSolicitudDto) {
        const data = await this.createUseCase.create(dto);
        return { statusCode: HttpStatus.CREATED, message: 'Creado', data };
    }

    @Get()
    @ApiOperation({ summary: 'Listar solicitudes paginado' })
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
