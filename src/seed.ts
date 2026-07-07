import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { RolOrmEntity } from './roles/infrastructure/entities/rol.orm-entity';
import { UsuarioOrmEntity } from './usuarios/infrastructure/entities/usuario.orm-entity';
import { PermisoOrmEntity } from './permisos/infrastructure/entities/permiso.orm-entity';
import { RolPermisoOrmEntity } from './roles/infrastructure/entities/rol-permiso.orm-entity';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  console.log('Initializing Application Context for Seeding...');
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  const roleRepo = dataSource.getRepository(RolOrmEntity);
  const userRepo = dataSource.getRepository(UsuarioOrmEntity);
  const permisoRepo = dataSource.getRepository(PermisoOrmEntity);
  const rolPermisoRepo = dataSource.getRepository(RolPermisoOrmEntity);

  console.log('Seeding roles...');
  const roles = ['Super Administrador', 'Administrador', 'Instructor', 'Aprendiz', 'Responsable de Bodega'];
  for (const roleName of roles) {
    const existing = await roleRepo.findOne({ where: { nombre: roleName } });
    if (!existing) {
      await roleRepo.save(roleRepo.create({ nombre: roleName }));
      console.log(`Role [${roleName}] inserted.`);
    } else {
      console.log(`Role [${roleName}] already exists.`);
    }
  }



  console.log('Seeding permisos...');
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
    const existing = await permisoRepo.findOne({ where: { nombre: p.nombre } });
    if (!existing) {
      await permisoRepo.save(permisoRepo.create(p));
      console.log(`Permiso [${p.nombre}] inserted.`);
    } else {
      console.log(`Permiso [${p.nombre}] already exists.`);
    }
  }

  console.log('Seeding rol_permisos default mappings...');
  const rolePermissionsSeed = [
    {
      rol: 'Super Administrador',
      permisos: [
        'ver_inventario', 'crear_inventario', 'editar_inventario', 'eliminar_inventario',
        'ver_productos', 'crear_productos', 'editar_productos', 'eliminar_productos',
        'ver_items', 'crear_items', 'editar_items',
        'ver_solicitudes', 'crear_solicitudes', 'aprobar_solicitudes', 'rechazar_solicitudes', 'entregar_solicitudes',
        'ver_devoluciones', 'crear_devoluciones',
        'ver_movimientos', 'crear_movimientos', 'ver_reportes',
        'ver_usuarios', 'crear_usuarios', 'editar_usuarios', 'eliminar_usuarios',
        'ver_chequeos', 'crear_chequeos',
        'ver_actas', 'crear_actas',
        'ver_notificaciones',
        'ver_dashboard',
        'ver_roles', 'crear_roles', 'editar_roles', 'eliminar_roles',
        'ver_fichas', 'crear_fichas', 'editar_fichas', 'eliminar_fichas',
        'ver_centros', 'crear_centros', 'editar_centros', 'eliminar_centros',
        'ver_sedes', 'crear_sedes', 'editar_sedes', 'eliminar_sedes',
        'ver_areas', 'crear_areas', 'editar_areas', 'eliminar_areas',
        'ver_sitios', 'crear_sitios', 'editar_sitios', 'eliminar_sitios',
        'ver_usuario_permisos', 'editar_usuario_permisos',
        'ver_permisos', 'crear_permisos',
        'ver_traslados', 'crear_traslados', 'aprobar_traslados', 'rechazar_traslados'
      ]
    },
    {
      rol: 'Administrador',
      permisos: [
        'ver_inventario', 'crear_inventario', 'editar_inventario', 'eliminar_inventario',
        'ver_productos', 'crear_productos', 'editar_productos', 'eliminar_productos',
        'ver_items', 'crear_items', 'editar_items',
        'ver_solicitudes', 'crear_solicitudes', 'aprobar_solicitudes', 'rechazar_solicitudes', 'entregar_solicitudes',
        'ver_devoluciones', 'crear_devoluciones',
        'ver_movimientos', 'crear_movimientos', 'ver_reportes',
        'ver_usuarios', 'crear_usuarios', 'editar_usuarios', 'eliminar_usuarios',
        'ver_chequeos', 'crear_chequeos',
        'ver_actas', 'crear_actas',
        'ver_notificaciones',
        'ver_dashboard',
        'ver_roles', 'crear_roles', 'editar_roles', 'eliminar_roles',
        'ver_fichas', 'crear_fichas', 'editar_fichas', 'eliminar_fichas',
        'ver_centros',
        'ver_sedes',
        'ver_areas', 'crear_areas', 'editar_areas', 'eliminar_areas',
        'ver_sitios', 'crear_sitios', 'editar_sitios', 'eliminar_sitios',
        'ver_usuario_permisos', 'editar_usuario_permisos',
        'ver_permisos', 'crear_permisos',
        'ver_traslados', 'crear_traslados', 'aprobar_traslados', 'rechazar_traslados'
      ]
    },
    {
      rol: 'Instructor',
      permisos: [
        'ver_inventario',
        'ver_productos',
        'ver_items',
        'ver_solicitudes', 'crear_solicitudes',
        'ver_devoluciones', 'crear_devoluciones',
        'ver_movimientos',
        'ver_chequeos', 'crear_chequeos',
        'ver_actas', 'crear_actas',
        'ver_notificaciones',
        'ver_dashboard',
        'ver_fichas',
        'ver_centros',
        'ver_sedes',
        'ver_areas',
        'ver_sitios',
        'ver_traslados', 'crear_traslados'
      ]
    },
    {
      rol: 'Aprendiz',
      permisos: [
        'ver_inventario',
        'ver_productos',
        'ver_items',
        'ver_solicitudes', 'crear_solicitudes',
        'ver_notificaciones',
        'ver_dashboard'
      ]
    },
    {
      rol: 'Responsable de Bodega',
      permisos: [
        'ver_inventario', 'crear_inventario',
        'ver_productos', 'crear_productos', 'editar_productos',
        'ver_items', 'crear_items', 'editar_items',
        'ver_solicitudes', 'aprobar_solicitudes', 'rechazar_solicitudes', 'entregar_solicitudes',
        'ver_traslados', 'aprobar_traslados', 'rechazar_traslados',
        'ver_devoluciones', 'crear_devoluciones',
        'ver_chequeos', 'crear_chequeos',
        'ver_actas', 'crear_actas',
        'ver_notificaciones',
        'ver_dashboard',
        'ver_fichas',
        'ver_sitios',
      ]
    }
  ];

  for (const item of rolePermissionsSeed) {
    const roleEntity = await roleRepo.findOne({ where: { nombre: item.rol } });
    if (!roleEntity) continue;

    for (const permName of item.permisos) {
      const permisoEntity = await permisoRepo.findOne({ where: { nombre: permName } });
      if (!permisoEntity) continue;

      const existing = await rolPermisoRepo.findOne({
        where: { id_rol: roleEntity.id_rol, id_permiso: permisoEntity.id_permiso }
      });

      if (!existing) {
        await rolPermisoRepo.save(rolPermisoRepo.create({
          id_rol: roleEntity.id_rol,
          id_permiso: permisoEntity.id_permiso
        }));
        console.log(`Assigned default permission [${permName}] to role [${item.rol}].`);
      }
    }
  }

  const superAdminRole = await roleRepo.findOne({ where: { nombre: 'Super Administrador' } });

  console.log('Seeding default super administrator user...');
  if (superAdminRole) {
    const existingSuperAdmin = await userRepo.findOne({ where: { correo: 'SuperAdmin@sena.co' } });
    const hashedPass = await bcrypt.hash('Super1234', 10);
    
    if (!existingSuperAdmin) {
      await userRepo.save(userRepo.create({
        nombre: 'Super Administrador Global',
        correo: 'SuperAdmin@sena.co',
        password: hashedPass,
        estado: true,
        rol: superAdminRole,
        tenant_id: 'GLOBAL'
      }));
      console.log('Super Administrator user [SuperAdmin@sena.co] created successfully.');
    } else {
      existingSuperAdmin.password = hashedPass;
      existingSuperAdmin.rol = superAdminRole;
      existingSuperAdmin.tenant_id = 'GLOBAL';
      await userRepo.save(existingSuperAdmin);
      console.log('Super Administrator user updated.');
    }
  }

  const adminRole = await roleRepo.findOne({ where: { nombre: 'Administrador' } });

  console.log('Seeding default administrator user...');
  if (adminRole) {
    const existingAdmin = await userRepo.findOne({ where: { correo: 'admin@sena.edu.co' } });
    const hashedPass = await bcrypt.hash('Admin123', 10);
    
    if (!existingAdmin) {
      await userRepo.save(userRepo.create({
        nombre: 'Usuario Administrador',
        correo: 'admin@sena.edu.co',
        password: hashedPass,
        estado: true,
        rol: adminRole
      }));
      console.log('Administrator user [admin@sena.edu.co] created successfully.');
    } else {
      // Update password just in case it was different
      existingAdmin.password = hashedPass;
      existingAdmin.rol = adminRole; // Ensure role is correct too
      await userRepo.save(existingAdmin);
      console.log('Administrator user [admin@sena.edu.co] updated with requested password.');
    }
  }


  const instructorRole = await roleRepo.findOne({ where: { nombre: 'Instructor' } });
  const aprendizRole = await roleRepo.findOne({ where: { nombre: 'Aprendiz' } });
  const responsableBodegaRole = await roleRepo.findOne({ where: { nombre: 'Responsable de Bodega' } });

  console.log('Seeding role permissions...');
  if (instructorRole) {
    const instructorPermNames = [
      'ver_inventario', 'ver_productos', 'ver_items',
      'ver_solicitudes', 'crear_solicitudes', 'ver_devoluciones',
      'crear_devoluciones', 'ver_movimientos', 'ver_chequeos',
      'crear_chequeos', 'ver_actas', 'crear_actas',
      'ver_notificaciones', 'ver_dashboard', 'ver_fichas',
      'ver_centros', 'ver_sedes', 'ver_areas',
      'ver_sitios', 'ver_traslados', 'crear_traslados'
    ];
    for (const name of instructorPermNames) {
      const perm = await permisoRepo.findOne({ where: { nombre: name } });
      if (perm) {
        const existing = await rolPermisoRepo.findOne({
          where: { id_rol: instructorRole.id_rol, id_permiso: perm.id_permiso }
        });
        if (!existing) {
          await rolPermisoRepo.save(rolPermisoRepo.create({
            id_rol: instructorRole.id_rol,
            id_permiso: perm.id_permiso
          }));
        }
      }
    }
    console.log('Permissions for Instructor seeded.');
  }

  if (aprendizRole) {
    const aprendizPermNames = [
      'ver_inventario', 'ver_productos', 'ver_items',
      'ver_solicitudes', 'crear_solicitudes', 'ver_dashboard'
    ];
    for (const name of aprendizPermNames) {
      const perm = await permisoRepo.findOne({ where: { nombre: name } });
      if (perm) {
        const existing = await rolPermisoRepo.findOne({
          where: { id_rol: aprendizRole.id_rol, id_permiso: perm.id_permiso }
        });
        if (!existing) {
          await rolPermisoRepo.save(rolPermisoRepo.create({
            id_rol: aprendizRole.id_rol,
            id_permiso: perm.id_permiso
          }));
        }
      }
    }
    console.log('Permissions for Aprendiz seeded.');
  }

  if (responsableBodegaRole) {
    const responsablePermNames = [
      'ver_inventario', 'crear_inventario',
      'ver_productos', 'crear_productos', 'editar_productos',
      'ver_items', 'crear_items', 'editar_items',
      'ver_solicitudes', 'aprobar_solicitudes', 'rechazar_solicitudes', 'entregar_solicitudes',
      'ver_traslados', 'aprobar_traslados', 'rechazar_traslados',
      'ver_devoluciones', 'crear_devoluciones',
      'ver_chequeos', 'crear_chequeos',
      'ver_actas', 'crear_actas',
      'ver_notificaciones',
      'ver_dashboard',
      'ver_fichas',
      'ver_sitios',
      'ver_asignaciones', 'crear_asignaciones',
    ];
    for (const name of responsablePermNames) {
      const perm = await permisoRepo.findOne({ where: { nombre: name } });
      if (perm) {
        const existing = await rolPermisoRepo.findOne({
          where: { id_rol: responsableBodegaRole.id_rol, id_permiso: perm.id_permiso }
        });
        if (!existing) {
          await rolPermisoRepo.save(rolPermisoRepo.create({
            id_rol: responsableBodegaRole.id_rol,
            id_permiso: perm.id_permiso
          }));
        }
      }
    }
    console.log('Permissions for Responsable de Bodega seeded.');
  }

  console.log('Seeding completed successfully.');
  await app.close();
}

bootstrap().catch(err => {
  console.error('Error during seeding:', err);
  process.exit(1);
});
