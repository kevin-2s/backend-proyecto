import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IUsuarioPermisosUseCases } from '../ports/input/usuario-permisos.use-cases.interface';
import { IUsuarioPermisosRepository } from '../ports/output/usuario-permisos.repository.interface';
import { IPermisosRepository } from '../../../permisos/application/ports/output/permisos.repository.interface';
import { IUsuariosRepository, USUARIOS_REPOSITORY } from '../../../usuarios/domain/ports/output/usuarios-repository.interface';
import { AsignarPermisoDto } from '../../infrastructure/adapters/input/http/dtos/asignar-permiso.dto';
import { ActualizarPermisoUsuarioDto } from '../../infrastructure/adapters/input/http/dtos/actualizar-permiso-usuario.dto';

@Injectable()
export class UsuarioPermisosService implements IUsuarioPermisosUseCases {
  constructor(
    @Inject(IUsuarioPermisosRepository)
    private readonly usuarioPermisosRepo: IUsuarioPermisosRepository,
    @Inject(IPermisosRepository)
    private readonly permisosRepo: IPermisosRepository,
    @Inject(USUARIOS_REPOSITORY)
    private readonly usuariosRepo: IUsuariosRepository,
  ) {}

  async getPermisosByUsuario(id_usuario: number): Promise<Record<string, any[]>> {
    const usuario = await this.usuariosRepo.findById(id_usuario);
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id_usuario} no encontrado`);
    }

    const permisos = await this.permisosRepo.findAll();
    const usuarioPermisos = await this.usuarioPermisosRepo.findAllByUserId(id_usuario);
    
    const esAdmin = usuario.rol?.nombre === 'Administrador';
    const esInstructor = usuario.rol?.nombre === 'Instructor';
    
    const grouped = permisos.reduce((acc, permiso) => {
      const moduleName = permiso.modulo;
      if (!acc[moduleName]) {
        acc[moduleName] = [];
      }
      
      const up = usuarioPermisos.find(up => up.id_permiso === permiso.id_permiso);
      
      let tienePermiso = false;
      let heredado = true;
      
      if (up) {
        tienePermiso = up.activo;
        heredado = false;
      } else if (esAdmin) {
        tienePermiso = true;
      } else if (esInstructor) {
        if (permiso.nombre.startsWith('ver_')) {
          tienePermiso = true;
        } else {
          tienePermiso = false;
        }
      } else {
         tienePermiso = false;
      }

      acc[moduleName].push({
        id_permiso: permiso.id_permiso,
        nombre: permiso.nombre,
        tiene_permiso: tienePermiso,
        heredado_de_rol: heredado,
      });
      
      return acc;
    }, {} as Record<string, any[]>);
    
    return grouped;
  }

  async asignarPermiso(id_usuario: number, dto: AsignarPermisoDto): Promise<any> {
    const usuario = await this.usuariosRepo.findById(id_usuario);
    if (!usuario) throw new NotFoundException(`Usuario con ID ${id_usuario} no encontrado`);

    const permiso = await this.permisosRepo.findById(dto.id_permiso);
    if (!permiso) throw new NotFoundException(`Permiso con ID ${dto.id_permiso} no encontrado`);

    let up = await this.usuarioPermisosRepo.findByUserIdAndPermisoId(id_usuario, dto.id_permiso);
    if (up) {
      up = await this.usuarioPermisosRepo.update(up.id, dto.activo);
    } else {
      up = await this.usuarioPermisosRepo.create({
        id_usuario,
        id_permiso: dto.id_permiso,
        activo: dto.activo,
      });
    }
    return up;
  }

  async actualizarPermiso(id_usuario: number, id_permiso: number, dto: ActualizarPermisoUsuarioDto): Promise<any> {
    const up = await this.usuarioPermisosRepo.findByUserIdAndPermisoId(id_usuario, id_permiso);
    if (!up) throw new NotFoundException(`Permiso de usuario no encontrado`);
    return this.usuarioPermisosRepo.update(up.id, dto.activo);
  }

  async eliminarPermiso(id_usuario: number, id_permiso: number): Promise<void> {
    const up = await this.usuarioPermisosRepo.findByUserIdAndPermisoId(id_usuario, id_permiso);
    if (!up) throw new NotFoundException(`Permiso de usuario no encontrado`);
    await this.usuarioPermisosRepo.delete(up.id);
  }
}
