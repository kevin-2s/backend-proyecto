import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { AuthModule } from './auth/infrastructure/auth.module';
import { RolesModule } from './roles/infrastructure/roles.module';
import { UsersModule } from './users/infrastructure/users.module';
import { CategoriaModule } from './categoria/infrastructure/categoria.module';
import { FichasModule } from './fichas/infrastructure/fichas.module';
import { SitiosModule } from './sitios/infrastructure/sitios.module';
import { ProductosModule } from './productos/infrastructure/productos.module';
import { InventarioModule } from './inventario/infrastructure/inventario.module';
import { MovimientosModule } from './movimientos/infrastructure/movimientos.module';
import { SolicitudesModule } from './solicitudes/infrastructure/solicitudes.module';
import { AsignacionesModule } from './asignaciones/infrastructure/asignaciones.module';
import { DevolucionesModule } from './devoluciones/infrastructure/devoluciones.module';
import { ChequeoModule } from './chequeo/infrastructure/chequeo.module';
import { ActasModule } from './actas/infrastructure/actas.module';
import { NecesidadesModule } from './necesidades/infrastructure/necesidades.module';
import { NotificacionesModule } from './notificaciones/infrastructure/notificaciones.module';
import { ReportesModule } from './reportes/infrastructure/reportes.module';

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
        UsersModule,
        CategoriaModule,
        FichasModule,
        SitiosModule,
        ProductosModule,
        InventarioModule,
        MovimientosModule,
        SolicitudesModule,
        AsignacionesModule,
        DevolucionesModule,
        ChequeoModule,
        ActasModule,
        NecesidadesModule,
        NotificacionesModule,
        ReportesModule,
    ],
})
export class AppModule {}
