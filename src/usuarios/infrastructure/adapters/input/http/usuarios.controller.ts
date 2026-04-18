import { Controller, Get, Post, Body, Param, Patch, ParseIntPipe, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { USUARIOS_USE_CASES, IUsuariosUseCases } from '../../../../domain/ports/input/usuarios-use-cases.interface';
import { CreateUsuarioDto } from './dtos/create-usuario.dto';
import { UpdateUsuarioDto } from './dtos/update-usuario.dto';
import { UsuarioNotFoundException } from '../../../../domain/exceptions/usuario-not-found.exception';

@Controller('usuarios')
export class UsuariosController {
  constructor(
    @Inject(USUARIOS_USE_CASES)
    private readonly usuariosUseCases: IUsuariosUseCases,
  ) {}

  private excludePassword(usuario: any) {
    const { password, ...usuarioSinPassword } = usuario;
    return usuarioSinPassword;
  }

  @Get()
  async getUsuarios() {
    try {
      const usuarios = await this.usuariosUseCases.obtenerUsuarios();
      return {
        statusCode: HttpStatus.OK,
        message: 'Usuarios obtenidos exitosamente',
        data: usuarios.map(u => this.excludePassword(u)),
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener los usuarios',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getUsuario(@Param('id', ParseIntPipe) id: number) {
    try {
      const usuario = await this.usuariosUseCases.obtenerUsuarioPorId(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Usuario obtenido exitosamente',
        data: this.excludePassword(usuario),
      };
    } catch (error) {
      if (error instanceof UsuarioNotFoundException) {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
          data: null,
        }, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener el usuario',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async createUsuario(@Body() createUsuarioDto: CreateUsuarioDto) {
    try {
      const usuario = await this.usuariosUseCases.crearUsuario(createUsuarioDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Usuario creado exitosamente',
        data: this.excludePassword(usuario),
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error al crear el usuario',
        data: null,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  async updateUsuario(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    try {
      const usuario = await this.usuariosUseCases.actualizarUsuario(id, updateUsuarioDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Usuario actualizado exitosamente',
        data: this.excludePassword(usuario),
      };
    } catch (error) {
      if (error instanceof UsuarioNotFoundException) {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
          data: null,
        }, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error al actualizar el usuario',
        data: null,
      }, HttpStatus.BAD_REQUEST);
    }
  }
}
