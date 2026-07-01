import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { PERMISOS_KEY } from '../decorators/requiere-permiso.decorator';

@Injectable()
export class PermisosGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private dataSource: DataSource,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermisos = this.reflector.getAllAndOverride<string[]>(PERMISOS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermisos || requiredPermisos.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user || !user.userId) {
      return false;
    }

    const userId = user.userId;
    const roles: string[] = user.roles || [];
    
    // El Administrador y Super Administrador tienen todos los permisos por defecto
    if (roles.includes('Administrador') || roles.includes('Super Administrador')) {
      // Still, check if there's an explicit DENY in usuario_permisos
      for (const reqPermiso of requiredPermisos) {
        const hasDeny = await this.checkExplicitDeny(userId, reqPermiso);
        if (hasDeny) {
          throw new ForbiddenException(`No tienes el permiso requerido: ${reqPermiso}`);
        }
      }
      return true;
    }

    for (const reqPermiso of requiredPermisos) {
      const hasAccess = await this.checkUserAccess(userId, roles, reqPermiso);
      if (!hasAccess) {
        throw new ForbiddenException(`No tienes el permiso requerido: ${reqPermiso}`);
      }
    }

    return true;
  }

  private async checkExplicitDeny(userId: number, permisoNombre: string): Promise<boolean> {
    const query = `
      SELECT up.activo 
      FROM usuario_permisos up
      INNER JOIN permisos p ON p.id_permiso = up.id_permiso
      WHERE up.id_usuario = $1 AND p.nombre = $2
    `;
    const result = await this.dataSource.query(query, [userId, permisoNombre]);
    if (result.length > 0) {
      return result[0].activo === false;
    }
    return false; // No explicit deny
  }

  private async checkUserAccess(userId: number, roles: string[], permisoNombre: string): Promise<boolean> {
    // 1. Check if there is an explicit record in usuario_permisos
    const query = `
      SELECT up.activo 
      FROM usuario_permisos up
      INNER JOIN permisos p ON p.id_permiso = up.id_permiso
      WHERE up.id_usuario = $1 AND p.nombre = $2
    `;
    const result = await this.dataSource.query(query, [userId, permisoNombre]);

    if (result.length > 0) {
      // Permiso explícito definido en usuario_permisos (sobrescribe al rol)
      return result[0].activo === true;
    }

    // 2. Si no hay registro, hereda de los roles configurados en la base de datos (rol_permisos)
    if (roles && roles.length > 0) {
      const placeholders = roles.map((_, i) => `$${i + 1}`).join(', ');
      const roleQuery = `
        SELECT rp.id 
        FROM rol_permisos rp
        INNER JOIN rol r ON r.id_rol = rp.id_rol
        INNER JOIN permisos p ON p.id_permiso = rp.id_permiso
        WHERE r.nombre IN (${placeholders}) AND p.nombre = $${roles.length + 1}
      `;
      const roleResult = await this.dataSource.query(roleQuery, [...roles, permisoNombre]);
      if (roleResult.length > 0) {
        return true;
      }
    }

    // 3. Fallback heredado por defecto (compatibilidad si la base de datos no está poblada)
    if (roles.includes('Instructor')) {
      // INSTRUCTOR tiene solo permisos de lectura por defecto (ej. ver_inventario)
      if (permisoNombre.startsWith('ver_')) {
        return true;
      }
    }

    return false;
  }
}
