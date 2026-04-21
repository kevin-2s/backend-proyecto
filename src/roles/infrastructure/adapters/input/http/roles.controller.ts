import { Controller, Get, Post, Body, Param, ParseIntPipe, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { ROLES_USE_CASES, IRolesUseCases } from '../../../../domain/ports/input/roles-use-cases.interface';
import { CreateRolDto } from './dtos/create-rol.dto';
import { RolNotFoundException } from '../../../../domain/exceptions/rol-not-found.exception';

@Controller('roles')
export class RolesController {
  constructor(
    @Inject(ROLES_USE_CASES)
    private readonly rolesUseCases: IRolesUseCases,
  ) {}

  @Get()
  async getRoles() {
    try {
      const roles = await this.rolesUseCases.obtenerRoles();
      return {
        statusCode: HttpStatus.OK,
        message: 'Roles obtenidos exitosamente',
        data: roles,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener los roles',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getRol(@Param('id', ParseIntPipe) id: number) {
    try {
      const rol = await this.rolesUseCases.obtenerRolPorId(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Rol obtenido exitosamente',
        data: rol,
      };
    } catch (error) {
      if (error instanceof RolNotFoundException) {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
          data: null,
        }, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener el rol',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async createRol(@Body() createRolDto: CreateRolDto) {
    try {
      const rol = await this.rolesUseCases.crearRol(createRolDto.nombre);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Rol creado exitosamente',
        data: rol,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error al crear el rol',
        data: null,
      }, HttpStatus.BAD_REQUEST);
    }
  }
}
