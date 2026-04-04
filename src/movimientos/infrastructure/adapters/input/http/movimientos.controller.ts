import { Controller, Get, Post, Body, Param, Query, Inject, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreateMovimientoDto } from './dtos/create-movimiento.dto';
import { FindMovimientoUseCase } from '../../../../domain/ports/input/find-movimiento.use-case';
import { CreateMovimientoUseCase } from '../../../../domain/ports/input/create-movimiento.use-case';

@ApiTags('movimientos')
@ApiBearerAuth()
@Controller('movimientos')
export class MovimientoController {
    constructor(
        @Inject('FindMovimientoUseCase') private readonly findUseCase: FindMovimientoUseCase,
        @Inject('CreateMovimientoUseCase') private readonly createUseCase: CreateMovimientoUseCase
    ) {}

    @Post()
    @ApiOperation({ summary: 'Crear movimiento' })
    async create(@Body() dto: CreateMovimientoDto) {
        const data = await this.createUseCase.create(dto);
        return { statusCode: HttpStatus.CREATED, message: 'Creado', data };
    }

    @Get()
    @ApiOperation({ summary: 'Listar movimientos paginado' })
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
