import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';

// Modulos de Infraestructura
import { AuthModule } from './auth/infrastructure/auth.module';
import { RolesModule } from './roles/infrastructure/roles.module';
import { UsuariosModule } from './usuarios/infrastructure/usuarios.module';
import { CategoriasModule } from './categorias/infrastructure/categorias.module';
import { ProductosModule } from './productos/infrastructure/productos.module';
import { ItemsModule } from './items/infrastructure/items.module';
import { SitiosModule } from './sitios/infrastructure/sitios.module';
import { InventarioModule } from './inventario/infrastructure/inventario.module';
import { FichasModule } from './fichas/infrastructure/fichas.module';
import { TiposMovimientoModule } from './tipos-movimiento/infrastructure/tipos-movimiento.module';
import { MovimientosModule } from './movimientos/infrastructure/movimientos.module';
import { KardexModule } from './kardex/infrastructure/kardex.module';
import { SolicitudesModule } from './solicitudes/infrastructure/solicitudes.module';
import { DetalleSolicitudModule } from './detalle-solicitud/infrastructure/detalle-solicitud.module';
import { DevolucionesModule } from './devoluciones/infrastructure/devoluciones.module';
import { ChequeosModule } from './chequeos/infrastructure/chequeos.module';
import { ItemsChequeoModule } from './items-chequeo/infrastructure/items-chequeo.module';
import { ActasModule } from './actas/infrastructure/actas.module';
import { NotificacionesModule } from './notificaciones/infrastructure/notificaciones.module';
import { PermisosModule } from './permisos/permisos.module';
import { UsuarioPermisosModule } from './usuario-permisos/usuario-permisos.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(5432),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        REDIS_HOST: Joi.string().default('localhost'),
        REDIS_PORT: Joi.number().default(6379),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, // Debe estar en false para Producción
      }),
    }),
    AuthModule,
    RolesModule,
    UsuariosModule,
    CategoriasModule,
    ProductosModule,
    ItemsModule,
    SitiosModule,
    InventarioModule,
    FichasModule,
    TiposMovimientoModule,
    MovimientosModule,
    KardexModule,
    SolicitudesModule,
    DetalleSolicitudModule,
    DevolucionesModule,
    ChequeosModule,
    ItemsChequeoModule,
    ActasModule,
    NotificacionesModule,
    PermisosModule,
    UsuarioPermisosModule,
  ],
})
export class AppModule {}
