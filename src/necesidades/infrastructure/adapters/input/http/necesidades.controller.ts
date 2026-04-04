import { Controller, Get, Post, Body, Param, Query, Inject, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreateNecesidadDto } from './dtos/create-necesidad.dto';
import { FindNecesidadUseCase } from '../../../../domain/ports/input/find-necesidad.use-case';
import { CreateNecesidadUseCase } from '../../../../domain/ports/input/create-necesidad.use-case';

@ApiTags('necesidades')
@ApiBearerAuth()
@Controller('necesidades')
export class NecesidadController {
    constructor(
        @Inject('FindNecesidadUseCase') private readonly findUseCase: FindNecesidadUseCase,
        @Inject('CreateNecesidadUseCase') private readonly createUseCase: CreateNecesidadUseCase
    ) {}

    @Post()
    @ApiOperation({ summary: 'Crear necesidad' })
    async create(@Body() dto: CreateNecesidadDto) {
        const data = await this.createUseCase.create(dto);
        return { statusCode: HttpStatus.CREATED, message: 'Creado', data };
    }

    @Get()
    @ApiOperation({ summary: 'Listar necesidades paginado' })
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
