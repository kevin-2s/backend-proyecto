import { Controller, Get, Post, Body, Param, Query, Inject, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreateUsuarioDto } from './dtos/create-usuario.dto';
import { FindUsuarioUseCase } from '../../../../domain/ports/input/find-usuario.use-case';
import { CreateUsuarioUseCase } from '../../../../domain/ports/input/create-usuario.use-case';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsuarioController {
    constructor(
        @Inject('FindUsuarioUseCase') private readonly findUseCase: FindUsuarioUseCase,
        @Inject('CreateUsuarioUseCase') private readonly createUseCase: CreateUsuarioUseCase
    ) {}

    @Post()
    @ApiOperation({ summary: 'Crear usuario' })
    async create(@Body() dto: CreateUsuarioDto) {
        const data = await this.createUseCase.create(dto);
        return { statusCode: HttpStatus.CREATED, message: 'Creado', data };
    }

    @Get()
    @ApiOperation({ summary: 'Listar users paginado' })
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
