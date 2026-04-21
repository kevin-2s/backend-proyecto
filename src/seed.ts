import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { RolOrmEntity } from './roles/infrastructure/entities/rol.orm-entity';
import { UsuarioOrmEntity } from './usuarios/infrastructure/entities/usuario.orm-entity';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  console.log('Initializing Application Context for Seeding...');
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  const roleRepo = dataSource.getRepository(RolOrmEntity);
  const userRepo = dataSource.getRepository(UsuarioOrmEntity);

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
