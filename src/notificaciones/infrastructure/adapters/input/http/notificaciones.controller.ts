import { Controller, Get, Post, Body, Param, Query, Inject, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreateNotificacionDto } from './dtos/create-notificacion.dto';
import { FindNotificacionUseCase } from '../../../../domain/ports/input/find-notificacion.use-case';
import { CreateNotificacionUseCase } from '../../../../domain/ports/input/create-notificacion.use-case';

@ApiTags('notificaciones')
@ApiBearerAuth()
@Controller('notificaciones')
export class NotificacionController {
    constructor(
        @Inject('FindNotificacionUseCase') private readonly findUseCase: FindNotificacionUseCase,
        @Inject('CreateNotificacionUseCase') private readonly createUseCase: CreateNotificacionUseCase
    ) {}

    @Post()
    @ApiOperation({ summary: 'Crear notificacion' })
    async create(@Body() dto: CreateNotificacionDto) {
        const data = await this.createUseCase.create(dto);
        return { statusCode: HttpStatus.CREATED, message: 'Creado', data };
    }

    @Get()
    @ApiOperation({ summary: 'Listar notificaciones paginado' })
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
