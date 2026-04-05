import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { RoleEntity } from './roles/infrastructure/entities/role.typeorm.entity';
import { UsuarioEntity } from './users/infrastructure/entities/usuario.typeorm.entity';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  console.log('Initializing Application Context for Seeding...');
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  const roleRepo = dataSource.getRepository(RoleEntity);
  const userRepo = dataSource.getRepository(UsuarioEntity);

  console.log('Seeding roles...');
  const roles = ['Administrador', 'Responsable', 'Aprendiz'];
  for (const roleName of roles) {
    const existing = await roleRepo.findOne({ where: { nombreRol: roleName } });
    if (!existing) {
      await roleRepo.save(roleRepo.create({ nombreRol: roleName }));
      console.log(`Role [${roleName}] inserted.`);
    } else {
      console.log(`Role [${roleName}] already exists.`);
    }
  }

  const adminRole = await roleRepo.findOne({ where: { nombreRol: 'Administrador' } });

  console.log('Seeding default administrator user...');
  if (adminRole) {
    const existingAdmin = await userRepo.findOne({ where: { correo: 'admin@sgm.com' } });
    if (!existingAdmin) {
      const hashedPass = await bcrypt.hash('Admin123!', 10);
      await userRepo.save(userRepo.create({
        nombreCompleto: 'Usuario Administrador',
        correo: 'admin@sgm.com',
        contrasena: hashedPass,
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
