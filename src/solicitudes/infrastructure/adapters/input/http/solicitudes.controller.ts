import {
  Controller, Get, Post, Body, Param, Patch,
  ParseIntPipe, Inject, HttpStatus, HttpException,
  UseGuards, Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SOLICITUDES_USE_CASES, ISolicitudesUseCases } from '../../../../domain/ports/input/solicitudes-use-cases.interface';
import { CreateSolicitudDto } from './dtos/create-solicitud.dto';
import { EstadoSolicitud } from '../../../../domain/entities/solicitud.domain.entity';
import { SolicitudNotFoundException } from '../../../../domain/exceptions/solicitud-not-found.exception';
import { AutoAprobacionSolicitudForbiddenException } from '../../../../domain/exceptions/auto-aprobacion-solicitud.exception';
import { SoloResponsablePuedeAprobarSolicitudForbiddenException } from '../../../../domain/exceptions/solo-responsable-puede-aprobar.exception';
import { SoloSolicitantePuedeConfirmarForbiddenException } from '../../../../domain/exceptions/solo-solicitante-puede-confirmar.exception';
import { PermisosGuard } from '../../../../../auth/infrastructure/guards/permisos.guard';
import { RequierePermiso } from '../../../../../auth/infrastructure/decorators/requiere-permiso.decorator';

@ApiTags('solicitudes')
@Controller('solicitudes')
@UseGuards(PermisosGuard)
export class SolicitudesController {
  constructor(
    @Inject(SOLICITUDES_USE_CASES)
    private readonly solicitudesUseCases: ISolicitudesUseCases,
  ) {}

  @Get()
  @RequierePermiso('ver_solicitudes')
  @ApiOperation({ summary: 'Obtener solicitudes filtradas según el rol del usuario' })
  async getSolicitudes(@Req() req: any) {
    const userId: number = req.user.userId;
    const roles: string[] = req.user.roles || [];
    const role = roles[0] || '';
    const solicitudes = await this.solicitudesUseCases.obtenerSolicitudes(userId, role);
    return {
      statusCode: HttpStatus.OK,
      message: 'Solicitudes obtenidas exitosamente',
      data: solicitudes,
    };
  }

  @Get(':id')
  @RequierePermiso('ver_solicitudes')
  async getSolicitud(@Param('id', ParseIntPipe) id: number) {
    try {
      const solicitud = await this.solicitudesUseCases.obtenerSolicitudPorId(id);
      return { statusCode: HttpStatus.OK, message: 'Solicitud obtenida exitosamente', data: solicitud };
    } catch (error) {
      this.handleError(error);
    }
  }

  @Post()
  @RequierePermiso('crear_solicitudes')
  @ApiOperation({ summary: 'Crear solicitud — el id_usuario se obtiene del token JWT' })
  async createSolicitud(@Body() createSolicitudDto: CreateSolicitudDto, @Req() req: any) {
    try {
      const id_usuario: number = req.user.userId;
      const solicitud = await this.solicitudesUseCases.crearSolicitud({
        ...createSolicitudDto,
        id_usuario,
      });
      return { statusCode: HttpStatus.CREATED, message: 'Solicitud creada exitosamente', data: solicitud };
    } catch (error) {
      throw new HttpException(
        { statusCode: HttpStatus.BAD_REQUEST, message: 'Error al crear la solicitud', data: null },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id/aprobar')
  @RequierePermiso('aprobar_solicitudes')
  @ApiOperation({ summary: 'Aprobar solicitud — solo el responsable de la bodega puede aprobar' })
  @ApiResponse({ status: 403, description: 'Sin permiso para aprobar esta solicitud' })
  async aprobarSolicitud(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    const userId: number = Number(req.user.userId);
    const roles: string[] = req.user.roles || [];
    const isAdmin = roles.some((r: string) => r.toLowerCase() === 'administrador');
    try {
      const solicitud = await this.solicitudesUseCases.cambiarEstadoSolicitud(id, EstadoSolicitud.APROBADA, userId, isAdmin);
      return { statusCode: HttpStatus.OK, message: 'Solicitud aprobada', data: solicitud };
    } catch (error) {
      this.handleError(error);
    }
  }

  @Patch(':id/rechazar')
  @RequierePermiso('rechazar_solicitudes')
  @ApiOperation({ summary: 'Rechazar solicitud — solo el responsable de la bodega puede rechazar' })
  @ApiResponse({ status: 403, description: 'Sin permiso para rechazar esta solicitud' })
  async rechazarSolicitud(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    const userId: number = Number(req.user.userId);
    const roles: string[] = req.user.roles || [];
    const isAdmin = roles.some((r: string) => r.toLowerCase() === 'administrador');
    try {
      const solicitud = await this.solicitudesUseCases.cambiarEstadoSolicitud(id, EstadoSolicitud.RECHAZADA, userId, isAdmin);
      return { statusCode: HttpStatus.OK, message: 'Solicitud rechazada', data: solicitud };
    } catch (error) {
      this.handleError(error);
    }
  }

  @Patch(':id/entregar')
  @RequierePermiso('entregar_solicitudes')
  async entregarSolicitud(@Param('id', ParseIntPipe) id: number) {
    try {
      const solicitud = await this.solicitudesUseCases.entregarSolicitud(id);
      return { statusCode: HttpStatus.OK, message: 'Solicitud marcada como en entrega', data: solicitud };
    } catch (error) {
      this.handleError(error);
    }
  }

  @Patch(':id/confirmar-recepcion')
  @RequierePermiso('ver_solicitudes')
  @ApiOperation({ summary: 'El solicitante confirma que recibió el material — cambia estado a ENTREGADA' })
  async confirmarRecepcion(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    const userId: number = Number(req.user.userId);
    try {
      const solicitud = await this.solicitudesUseCases.confirmarRecepcionSolicitud(id, userId);
      return { statusCode: HttpStatus.OK, message: 'Recepción confirmada', data: solicitud };
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any): never {
    if (
      error instanceof AutoAprobacionSolicitudForbiddenException ||
      error instanceof SoloResponsablePuedeAprobarSolicitudForbiddenException ||
      error instanceof SoloSolicitantePuedeConfirmarForbiddenException
    ) {
      throw new HttpException(
        { statusCode: HttpStatus.FORBIDDEN, message: error.message, data: null },
        HttpStatus.FORBIDDEN,
      );
    }
    if (error instanceof SolicitudNotFoundException) {
      throw new HttpException(
        { statusCode: HttpStatus.NOT_FOUND, message: error.message, data: null },
        HttpStatus.NOT_FOUND,
      );
    }
    throw new HttpException(
      { statusCode: HttpStatus.BAD_REQUEST, message: 'Error en la operación', data: null },
      HttpStatus.BAD_REQUEST,
    );
  }
}
