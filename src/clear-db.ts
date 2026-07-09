import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

/**
 * Script de limpieza de base de datos.
 *
 * Elimina todos los datos transaccionales y luego restaura:
 *  - Roles
 *  - Permisos
 *  - Asignaciones rol-permiso
 *  - Usuario Super Administrador (SuperAdmin@sena.co / Super1234)
 *
 * Uso: npm run clear:db
 */
async function bootstrap() {
  console.log('🚀 Iniciando contexto de la aplicación...');
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  // Descubrir nombres reales de tablas desde TypeORM
  const allTables = dataSource.entityMetadatas.map(m => m.tableName);

  console.log('\n🧹 Limpiando todas las tablas...');

  // Deshabilitar restricciones FK para truncar sin importar el orden
  await dataSource.query('SET session_replication_role = replica;');

  for (const table of allTables) {
    try {
      await dataSource.query(`TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE`);
      console.log(`  ✅ "${table}" limpiada.`);
    } catch (err: any) {
      console.warn(`  ⚠️  Error en "${table}": ${err.message}`);
    }
  }

  // Re-habilitar restricciones FK
  await dataSource.query('SET session_replication_role = DEFAULT;');

  // ─── Restaurar Roles ────────────────────────────────────────────────
  console.log('\n🎭 Restaurando roles...');
  const roles = ['Super Administrador', 'Administrador', 'Instructor', 'Aprendiz', 'Responsable de Bodega'];
  for (const roleName of roles) {
    await dataSource.query(
      `INSERT INTO "rol" (nombre) VALUES ($1) ON CONFLICT DO NOTHING`,
      [roleName]
    );
    console.log(`  ✅ Rol "${roleName}"`);
  }

  // ─── Restaurar Permisos ─────────────────────────────────────────────
  console.log('\n🔑 Restaurando permisos...');
  const permisosSeed = [
    { nombre: 'ver_inventario', descripcion: 'Permite ver el inventario', modulo: 'inventario' },
    { nombre: 'crear_inventario', descripcion: 'Permite crear en inventario', modulo: 'inventario' },
    { nombre: 'editar_inventario', descripcion: 'Permite editar inventario', modulo: 'inventario' },
    { nombre: 'eliminar_inventario', descripcion: 'Permite eliminar del inventario', modulo: 'inventario' },
    { nombre: 'ver_productos', descripcion: 'Permite ver productos', modulo: 'productos' },
    { nombre: 'crear_productos', descripcion: 'Permite crear productos', modulo: 'productos' },
    { nombre: 'editar_productos', descripcion: 'Permite editar productos', modulo: 'productos' },
    { nombre: 'eliminar_productos', descripcion: 'Permite eliminar productos', modulo: 'productos' },
    { nombre: 'ver_items', descripcion: 'Permite ver items', modulo: 'items' },
    { nombre: 'crear_items', descripcion: 'Permite crear items', modulo: 'items' },
    { nombre: 'editar_items', descripcion: 'Permite editar items', modulo: 'items' },
    { nombre: 'ver_solicitudes', descripcion: 'Permite ver solicitudes', modulo: 'solicitudes' },
    { nombre: 'crear_solicitudes', descripcion: 'Permite crear solicitudes', modulo: 'solicitudes' },
    { nombre: 'aprobar_solicitudes', descripcion: 'Permite aprobar solicitudes', modulo: 'solicitudes' },
    { nombre: 'rechazar_solicitudes', descripcion: 'Permite rechazar solicitudes', modulo: 'solicitudes' },
    { nombre: 'entregar_solicitudes', descripcion: 'Permite entregar solicitudes', modulo: 'solicitudes' },
    { nombre: 'ver_devoluciones', descripcion: 'Permite ver devoluciones', modulo: 'devoluciones' },
    { nombre: 'crear_devoluciones', descripcion: 'Permite crear devoluciones', modulo: 'devoluciones' },
    { nombre: 'ver_movimientos', descripcion: 'Permite ver movimientos', modulo: 'movimientos' },
    { nombre: 'crear_movimientos', descripcion: 'Permite crear movimientos', modulo: 'movimientos' },
    { nombre: 'ver_reportes', descripcion: 'Permite ver reportes', modulo: 'movimientos' },
    { nombre: 'ver_usuarios', descripcion: 'Permite ver usuarios', modulo: 'usuarios' },
    { nombre: 'crear_usuarios', descripcion: 'Permite crear usuarios', modulo: 'usuarios' },
    { nombre: 'editar_usuarios', descripcion: 'Permite editar usuarios', modulo: 'usuarios' },
    { nombre: 'eliminar_usuarios', descripcion: 'Permite eliminar usuarios', modulo: 'usuarios' },
    { nombre: 'ver_chequeos', descripcion: 'Permite ver chequeos', modulo: 'chequeos' },
    { nombre: 'crear_chequeos', descripcion: 'Permite crear chequeos', modulo: 'chequeos' },
    { nombre: 'ver_actas', descripcion: 'Permite ver actas', modulo: 'actas' },
    { nombre: 'crear_actas', descripcion: 'Permite crear actas', modulo: 'actas' },
    { nombre: 'ver_notificaciones', descripcion: 'Permite ver notificaciones', modulo: 'notificaciones' },
    { nombre: 'ver_dashboard', descripcion: 'Permite ver el dashboard', modulo: 'dashboard' },
    { nombre: 'ver_roles', descripcion: 'Permite ver roles', modulo: 'roles' },
    { nombre: 'crear_roles', descripcion: 'Permite crear roles', modulo: 'roles' },
    { nombre: 'editar_roles', descripcion: 'Permite editar roles', modulo: 'roles' },
    { nombre: 'eliminar_roles', descripcion: 'Permite eliminar roles', modulo: 'roles' },
    { nombre: 'ver_fichas', descripcion: 'Permite ver fichas', modulo: 'fichas' },
    { nombre: 'crear_fichas', descripcion: 'Permite crear fichas', modulo: 'fichas' },
    { nombre: 'editar_fichas', descripcion: 'Permite editar fichas', modulo: 'fichas' },
    { nombre: 'eliminar_fichas', descripcion: 'Permite eliminar fichas', modulo: 'fichas' },
    { nombre: 'ver_centros', descripcion: 'Permite ver centros', modulo: 'centros' },
    { nombre: 'crear_centros', descripcion: 'Permite crear centros', modulo: 'centros' },
    { nombre: 'editar_centros', descripcion: 'Permite editar centros', modulo: 'centros' },
    { nombre: 'eliminar_centros', descripcion: 'Permite eliminar centros', modulo: 'centros' },
    { nombre: 'ver_sedes', descripcion: 'Permite ver sedes', modulo: 'sedes' },
    { nombre: 'crear_sedes', descripcion: 'Permite crear sedes', modulo: 'sedes' },
    { nombre: 'editar_sedes', descripcion: 'Permite editar sedes', modulo: 'sedes' },
    { nombre: 'eliminar_sedes', descripcion: 'Permite eliminar sedes', modulo: 'sedes' },
    { nombre: 'ver_areas', descripcion: 'Permite ver áreas', modulo: 'areas' },
    { nombre: 'crear_areas', descripcion: 'Permite crear áreas', modulo: 'areas' },
    { nombre: 'editar_areas', descripcion: 'Permite editar áreas', modulo: 'areas' },
    { nombre: 'eliminar_areas', descripcion: 'Permite eliminar áreas', modulo: 'areas' },
    { nombre: 'ver_sitios', descripcion: 'Permite ver sitios', modulo: 'sitios' },
    { nombre: 'crear_sitios', descripcion: 'Permite crear sitios', modulo: 'sitios' },
    { nombre: 'editar_sitios', descripcion: 'Permite editar sitios', modulo: 'sitios' },
    { nombre: 'eliminar_sitios', descripcion: 'Permite eliminar sitios', modulo: 'sitios' },
    { nombre: 'ver_usuario_permisos', descripcion: 'Permite ver permisos asignados a usuarios', modulo: 'usuarios' },
    { nombre: 'editar_usuario_permisos', descripcion: 'Permite asignar/editar permisos a usuarios', modulo: 'usuarios' },
    { nombre: 'ver_permisos', descripcion: 'Permite ver todos los permisos', modulo: 'permisos' },
    { nombre: 'crear_permisos', descripcion: 'Permite crear nuevos permisos', modulo: 'permisos' },
    { nombre: 'ver_traslados', descripcion: 'Permite ver traslados', modulo: 'traslados' },
    { nombre: 'crear_traslados', descripcion: 'Permite crear traslados', modulo: 'traslados' },
    { nombre: 'aprobar_traslados', descripcion: 'Permite aprobar traslados', modulo: 'traslados' },
    { nombre: 'rechazar_traslados', descripcion: 'Permite rechazar traslados', modulo: 'traslados' },
  ];

  for (const p of permisosSeed) {
    await dataSource.query(
      `INSERT INTO "permisos" (nombre, descripcion, modulo) VALUES ($1, $2, $3) ON CONFLICT (nombre) DO NOTHING`,
      [p.nombre, p.descripcion, p.modulo]
    );
  }
  console.log(`  ✅ ${permisosSeed.length} permisos restaurados.`);

  // ─── Restaurar Rol-Permisos ─────────────────────────────────────────
  console.log('\n🔗 Restaurando asignaciones rol-permiso...');
  const rolePermissionsSeed: Record<string, string[]> = {
    'Super Administrador': [
      'ver_inventario', 'crear_inventario', 'editar_inventario', 'eliminar_inventario',
      'ver_productos', 'crear_productos', 'editar_productos', 'eliminar_productos',
      'ver_items', 'crear_items', 'editar_items',
      'ver_solicitudes', 'crear_solicitudes', 'aprobar_solicitudes', 'rechazar_solicitudes', 'entregar_solicitudes',
      'ver_devoluciones', 'crear_devoluciones',
      'ver_movimientos', 'crear_movimientos', 'ver_reportes',
      'ver_usuarios', 'crear_usuarios', 'editar_usuarios', 'eliminar_usuarios',
      'ver_chequeos', 'crear_chequeos', 'ver_actas', 'crear_actas',
      'ver_notificaciones', 'ver_dashboard',
      'ver_roles', 'crear_roles', 'editar_roles', 'eliminar_roles',
      'ver_fichas', 'crear_fichas', 'editar_fichas', 'eliminar_fichas',
      'ver_centros', 'crear_centros', 'editar_centros', 'eliminar_centros',
      'ver_sedes', 'crear_sedes', 'editar_sedes', 'eliminar_sedes',
      'ver_areas', 'crear_areas', 'editar_areas', 'eliminar_areas',
      'ver_sitios', 'crear_sitios', 'editar_sitios', 'eliminar_sitios',
      'ver_usuario_permisos', 'editar_usuario_permisos',
      'ver_permisos', 'crear_permisos',
      'ver_traslados', 'crear_traslados', 'aprobar_traslados', 'rechazar_traslados',
    ],
    'Administrador': [
      'ver_inventario', 'crear_inventario', 'editar_inventario', 'eliminar_inventario',
      'ver_productos', 'crear_productos', 'editar_productos', 'eliminar_productos',
      'ver_items', 'crear_items', 'editar_items',
      'ver_solicitudes', 'crear_solicitudes', 'aprobar_solicitudes', 'rechazar_solicitudes', 'entregar_solicitudes',
      'ver_devoluciones', 'crear_devoluciones',
      'ver_movimientos', 'crear_movimientos', 'ver_reportes',
      'ver_usuarios', 'crear_usuarios', 'editar_usuarios', 'eliminar_usuarios',
      'ver_chequeos', 'crear_chequeos', 'ver_actas', 'crear_actas',
      'ver_notificaciones', 'ver_dashboard',
      'ver_roles', 'crear_roles', 'editar_roles', 'eliminar_roles',
      'ver_fichas', 'crear_fichas', 'editar_fichas', 'eliminar_fichas',
      'ver_centros', 'ver_sedes',
      'ver_areas', 'crear_areas', 'editar_areas', 'eliminar_areas',
      'ver_sitios', 'crear_sitios', 'editar_sitios', 'eliminar_sitios',
      'ver_usuario_permisos', 'editar_usuario_permisos',
      'ver_permisos', 'crear_permisos',
      'ver_traslados', 'crear_traslados', 'aprobar_traslados', 'rechazar_traslados',
    ],
    'Instructor': [
      'ver_inventario', 'ver_productos', 'ver_items',
      'ver_solicitudes', 'crear_solicitudes',
      'ver_devoluciones', 'crear_devoluciones',
      'ver_movimientos', 'ver_chequeos', 'crear_chequeos',
      'ver_actas', 'crear_actas', 'ver_notificaciones', 'ver_dashboard',
      'ver_fichas', 'ver_centros', 'ver_sedes', 'ver_areas', 'ver_sitios',
      'ver_traslados', 'crear_traslados',
    ],
    'Aprendiz': [
      'ver_inventario', 'ver_productos', 'ver_items',
      'ver_solicitudes', 'crear_solicitudes',
      'ver_notificaciones', 'ver_dashboard',
    ],
    'Responsable de Bodega': [
      'ver_inventario', 'ver_productos', 'ver_items',
      'ver_solicitudes', 'aprobar_solicitudes', 'rechazar_solicitudes', 'entregar_solicitudes',
      'ver_traslados', 'aprobar_traslados', 'rechazar_traslados',
      'ver_devoluciones', 'crear_devoluciones',
      'ver_chequeos', 'crear_chequeos',
      'ver_actas', 'crear_actas',
      'ver_notificaciones', 'ver_dashboard',
      'ver_fichas', 'ver_sitios',
    ],
  };

  for (const [rolName, permNames] of Object.entries(rolePermissionsSeed)) {
    const [roleRow] = await dataSource.query(
      `SELECT id_rol FROM "rol" WHERE nombre = $1 LIMIT 1`, [rolName]
    );
    if (!roleRow) continue;

    for (const permName of permNames) {
      const [permRow] = await dataSource.query(
        `SELECT id_permiso FROM "permisos" WHERE nombre = $1 LIMIT 1`, [permName]
      );
      if (!permRow) continue;

      await dataSource.query(
        `INSERT INTO "rol_permisos" (id_rol, id_permiso) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
        [roleRow.id_rol, permRow.id_permiso]
      );
    }
    console.log(`  ✅ Permisos asignados a "${rolName}"`);
  }

  // ─── Restaurar Super Administrador ──────────────────────────────────
  console.log('\n👤 Restaurando Super Administrador...');
  const hashedPass = await bcrypt.hash('Super1234', 10);

  const [superAdminRole] = await dataSource.query(
    `SELECT id_rol FROM "rol" WHERE nombre = 'Super Administrador' LIMIT 1`
  );

  if (superAdminRole) {
    await dataSource.query(`
      INSERT INTO "usuario" (nombre, correo, password, estado, "id_rol", tenant_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (correo) DO UPDATE SET password = EXCLUDED.password, estado = EXCLUDED.estado
    `, ['Super Administrador Global', 'SuperAdmin@sena.co', hashedPass, true, superAdminRole.id_rol, 'GLOBAL']);
    console.log('  ✅ Super Administrador restaurado.');
  }

  console.log('\n✅ Base de datos limpiada y restaurada exitosamente.');
  console.log('════════════════════════════════════════');
  console.log('  📧 Email:      SuperAdmin@sena.co');
  console.log('  🔑 Contraseña: Super1234');
  console.log('════════════════════════════════════════');

  await app.close();
}

bootstrap().catch(err => {
  console.error('❌ Error durante la limpieza:', err);
  process.exit(1);
});
