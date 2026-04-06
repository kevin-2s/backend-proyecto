import { Controller, Get, Post, Body, Param, Query, Inject, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreateRoleDto } from './dtos/create-role.dto';
import { FindRolesUseCase } from '../../../../domain/ports/input/find-roles.use-case';
import { CreateRoleUseCase } from '../../../../domain/ports/input/create-role.use-case';
import { JwtAuthGuard } from '../../../../../auth/infrastructure/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../../auth/infrastructure/guards/roles.guard';
import { Roles } from '../../../../../auth/infrastructure/decorators/roles.decorator';

@ApiTags('roles')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('roles')
export class RolesController {
    constructor(
        @Inject('FindRolesUseCase') private readonly findRolesUseCase: FindRolesUseCase,
        @Inject('CreateRoleUseCase') private readonly createRoleUseCase: CreateRoleUseCase
    ) {}

    @Roles('Administrador')
    @Post()
    @ApiOperation({ summary: 'Crear un nuevo rol (Solo Administrador)' })
    async create(@Body() createRoleDto: CreateRoleDto) {
        const data = await this.createRoleUseCase.create(createRoleDto);
        return { statusCode: HttpStatus.CREATED, message: 'Rol creado exitosamente', data };
    }

    @Get()
    @ApiOperation({ summary: 'Obtener listado de roles con paginación' })
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
    async findAll(
        @Query('page') page: string = '1',
        @Query('limit') limit: string = '10'
    ) {
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        const paginatedData = await this.findRolesUseCase.findAll(pageNumber, limitNumber);
        
        // Estructura de paginación expandida conforme al requerimiento { data[], total, page, limit } insertado en la respuesta estandarizada
        return { 
            statusCode: HttpStatus.OK, 
            message: 'Listado de roles', 
            data: paginatedData.data,
            total: paginatedData.total,
            page: paginatedData.page,
            limit: paginatedData.limit
        };
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un rol por su ID' })
    async findById(@Param('id') id: string) {
        const data = await this.findRolesUseCase.findById(id);
        return { statusCode: HttpStatus.OK, message: 'Rol encontrado', data };
    }
}
