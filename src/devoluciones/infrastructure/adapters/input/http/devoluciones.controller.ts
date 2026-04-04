import { Controller, Get, Post, Body, Param, Query, Inject, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreateDevolucionDto } from './dtos/create-devolucion.dto';
import { FindDevolucionUseCase } from '../../../../domain/ports/input/find-devolucion.use-case';
import { CreateDevolucionUseCase } from '../../../../domain/ports/input/create-devolucion.use-case';

@ApiTags('devoluciones')
@ApiBearerAuth()
@Controller('devoluciones')
export class DevolucionController {
    constructor(
        @Inject('FindDevolucionUseCase') private readonly findUseCase: FindDevolucionUseCase,
        @Inject('CreateDevolucionUseCase') private readonly createUseCase: CreateDevolucionUseCase
    ) {}

    @Post()
    @ApiOperation({ summary: 'Crear devolucion' })
    async create(@Body() dto: CreateDevolucionDto) {
        const data = await this.createUseCase.create(dto);
        return { statusCode: HttpStatus.CREATED, message: 'Creado', data };
    }

    @Get()
    @ApiOperation({ summary: 'Listar devoluciones paginado' })
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
