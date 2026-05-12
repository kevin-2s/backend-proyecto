import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { RolOrmEntity } from './roles/infrastructure/entities/rol.orm-entity';
import { UsuarioOrmEntity } from './usuarios/infrastructure/entities/usuario.orm-entity';
import { PermisoOrmEntity } from './permisos/infrastructure/entities/permiso.orm-entity';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  console.log('Initializing Application Context for Seeding...');
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  const roleRepo = dataSource.getRepository(RolOrmEntity);
  const userRepo = dataSource.getRepository(UsuarioOrmEntity);
  const permisoRepo = dataSource.getRepository(PermisoOrmEntity);

  console.log('Seeding roles...');
  const roles = ['Administrador', 'Responsable', 'Aprendiz'];
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
    { nombre: 'ver_chequeos', descripcion: 'Permite ver chequeos', modulo: 'chequeos' },
    { nombre: 'crear_chequeos', descripcion: 'Permite crear chequeos', modulo: 'chequeos' },
    { nombre: 'ver_actas', descripcion: 'Permite ver actas', modulo: 'actas' },
    { nombre: 'crear_actas', descripcion: 'Permite crear actas', modulo: 'actas' },
    { nombre: 'ver_notificaciones', descripcion: 'Permite ver notificaciones', modulo: 'notificaciones' },
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

  const adminRole = await roleRepo.findOne({ where: { nombre: 'Administrador' } });

  console.log('Seeding default administrator user...');
  if (adminRole) {
    const existingAdmin = await userRepo.findOne({ where: { correo: 'admin@sgm.com' } });
    if (!existingAdmin) {
      const hashedPass = await bcrypt.hash('Admin123!', 10);
      await userRepo.save(userRepo.create({
        nombre: 'Usuario Administrador',
        correo: 'admin@sgm.com',
        password: hashedPass,
        estado: true,
        rol: adminRole
      }));
      console.log('Administrator user [admin@sgm.com] created successfully.');
    } else {
      console.log('Administrator user [admin@sgm.com] already exists.');
    }
  }

  console.log('Seeding completed successfully.');
  await app.close();
}

bootstrap().catch(err => {
  console.error('Error during seeding:', err);
  process.exit(1);
});
