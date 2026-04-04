const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const modules = [
    { mod: 'users', entity: 'Usuario', props: [{ n: 'email', t: 'string' }, { n: 'passwordHash', t: 'string' }, { n: 'nombres', t: 'string' }, { n: 'apellidos', t: 'string' }, { n: 'rolId', t: 'string' }] },
    { mod: 'categoria', entity: 'Categoria', props: [{ n: 'nombre', t: 'string' }, { n: 'descripcion', t: 'string' }] },
    { mod: 'fichas', entity: 'Ficha', props: [{ n: 'codigo', t: 'string' }, { n: 'programa', t: 'string' }, { n: 'estado', t: 'string' }] },
    { mod: 'sitios', entity: 'Sitio', props: [{ n: 'nombre', t: 'string' }, { n: 'tipoSitio', t: 'string' }, { n: 'capacidad', t: 'number' }] },
    { mod: 'productos', entity: 'Producto', props: [{ n: 'nombre', t: 'string' }, { n: 'descripcion', t: 'string' }, { n: 'categoriaId', t: 'string' }, { n: 'stockMinimo', t: 'number' }] },
    { mod: 'inventario', entity: 'Inventario', props: [{ n: 'productoId', t: 'string' }, { n: 'sitioId', t: 'string' }, { n: 'cantidad', t: 'number' }] },
    { mod: 'movimientos', entity: 'Movimiento', props: [{ n: 'tipoMovimiento', t: 'string' }, { n: 'productoId', t: 'string' }, { n: 'cantidad', t: 'number' }, { n: 'sitioOrigenId', t: 'string' }, { n: 'sitioDestinoId', t: 'string' }, { n: 'usuarioId', t: 'string' }] },
    { mod: 'solicitudes', entity: 'Solicitud', props: [{ n: 'usuarioId', t: 'string' }, { n: 'estado', t: 'string' }] },
    { mod: 'asignaciones', entity: 'Asigna', props: [{ n: 'solicitudId', t: 'string' }, { n: 'inventarioId', t: 'string' }, { n: 'cantidad', t: 'number' }] },
    { mod: 'devoluciones', entity: 'Devolucion', props: [{ n: 'asignacionId', t: 'string' }, { n: 'cantidadDevuelta', t: 'number' }, { n: 'estadoFisico', t: 'string' }] },
    { mod: 'chequeo', entity: 'Chequeo', props: [{ n: 'sitioId', t: 'string' }, { n: 'responsableId', t: 'string' }] },
    { mod: 'actas', entity: 'Acta', props: [{ n: 'movimientoId', t: 'string' }, { n: 'tipoActa', t: 'string' }, { n: 'urlPdf', t: 'string' }, { n: 'generadoPor', t: 'string' }] },
    { mod: 'necesidades', entity: 'Necesidad', props: [{ n: 'productoId', t: 'string' }, { n: 'cantidadNecesaria', t: 'number' }, { n: 'justificacion', t: 'string' }, { n: 'estado', t: 'string' }] },
    { mod: 'notificaciones', entity: 'Notificacion', props: [{ n: 'usuarioId', t: 'string' }, { n: 'mensaje', t: 'string' }, { n: 'leida', t: 'boolean' }] },
    { mod: 'reportes', entity: 'Reporte', props: [{ n: 'tipoReporte', t: 'string' }, { n: 'parametros', t: 'string' }, { n: 'urlGenerado', t: 'string' }] }
];

function mkdir(p) { fs.mkdirSync(p, { recursive: true }); }
function write(p, content) { fs.writeFileSync(p, content.trim() + '\n', 'utf8'); }

for (const m of modules) {
    const dEntity = m.entity;
    const lEntity = dEntity.toLowerCase();
    const basePath = path.join(srcDir, m.mod);

    mkdir(path.join(basePath, 'domain/entities'));
    mkdir(path.join(basePath, 'domain/exceptions'));
    mkdir(path.join(basePath, 'domain/ports/input'));
    mkdir(path.join(basePath, 'domain/ports/output'));
    mkdir(path.join(basePath, 'application/services'));
    mkdir(path.join(basePath, 'infrastructure/entities'));
    mkdir(path.join(basePath, 'infrastructure/mappers'));
    mkdir(path.join(basePath, 'infrastructure/adapters/output/persistence'));
    mkdir(path.join(basePath, 'infrastructure/adapters/input/http/dtos'));

    const propsArgs = m.props.map(p => "public readonly " + p.n + ": " + p.t).join(',\n        ');
    const propsInit = m.props.map(p => "command." + p.n).join(', ');

    write(path.join(basePath, `domain/entities/${lEntity}.entity.ts`), `
export class ${dEntity} {
    constructor(
        public readonly id: string,
        ${propsArgs},
        public readonly createdAt: Date,
        public readonly updatedAt: Date
    ) {}
}
`);

    write(path.join(basePath, `domain/exceptions/${lEntity}-not-found.exception.ts`), `
export class ${dEntity}NotFoundException extends Error {
    constructor(id: string) {
        super("${dEntity} con identificador " + id + " no encontrado");
        this.name = "${dEntity}NotFoundException";
    }
}
`);

    write(path.join(basePath, `domain/ports/output/${lEntity}.repository.port.ts`), `
import { ${dEntity} } from '../../entities/${lEntity}.entity';

export interface PaginatedResult<T> { data: T[]; total: number; page: number; limit: number; }

export interface ${dEntity}RepositoryPort {
    findAll(page: number, limit: number): Promise<PaginatedResult<${dEntity}>>;
    findById(id: string): Promise<${dEntity} | null>;
    save(entity: ${dEntity}): Promise<${dEntity}>;
}
`);

    const commandProps = m.props.map(p => p.n + ": " + p.t + ";").join('\n    ');
    write(path.join(basePath, `domain/ports/input/create-${lEntity}.use-case.ts`), `
import { ${dEntity} } from '../../entities/${lEntity}.entity';

export interface Create${dEntity}Command {
    ${commandProps}
}

export interface Create${dEntity}UseCase {
    create(command: Create${dEntity}Command): Promise<${dEntity}>;
}
`);

    write(path.join(basePath, `domain/ports/input/find-${lEntity}.use-case.ts`), `
import { ${dEntity} } from '../../entities/${lEntity}.entity';
import { PaginatedResult } from '../output/${lEntity}.repository.port';

export interface Find${dEntity}UseCase {
    findAll(page: number, limit: number): Promise<PaginatedResult<${dEntity}>>;
    findById(id: string): Promise<${dEntity}>;
}
`);

    let extraSvcLogic = "";
    if (m.mod === 'inventario') extraSvcLogic = "\n        // TODO: Integración con BullMQ para alerta de bajo stock";
    if (m.mod === 'actas') extraSvcLogic = "\n        // TODO: Generación de Acta PDF via PDFKit";

    write(path.join(basePath, `application/services/${m.mod}.service.ts`), `
import { ${dEntity} } from '../../domain/entities/${lEntity}.entity';
import { Find${dEntity}UseCase } from '../../domain/ports/input/find-${lEntity}.use-case';
import { Create${dEntity}UseCase, Create${dEntity}Command } from '../../domain/ports/input/create-${lEntity}.use-case';
import { ${dEntity}RepositoryPort, PaginatedResult } from '../../domain/ports/output/${lEntity}.repository.port';
import { ${dEntity}NotFoundException } from '../../domain/exceptions/${lEntity}-not-found.exception';

export class ${dEntity}Service implements Find${dEntity}UseCase, Create${dEntity}UseCase {
    constructor(private readonly repository: ${dEntity}RepositoryPort) {}

    async findAll(page: number, limit: number): Promise<PaginatedResult<${dEntity}>> {
        return this.repository.findAll(page, limit);
    }

    async findById(id: string): Promise<${dEntity}> {
        const entity = await this.repository.findById(id);
        if (!entity) throw new ${dEntity}NotFoundException(id);
        return entity;
    }

    async create(command: Create${dEntity}Command): Promise<${dEntity}> {
        const newEntity = new ${dEntity}('', ${propsInit}, new Date(), new Date());${extraSvcLogic}
        return this.repository.save(newEntity);
    }
}
`);

    const ormProps = m.props.map(p => {
        let type = p.t === 'number' ? 'int' : (p.t === 'boolean' ? 'boolean' : 'varchar');
        return "@Column({ type: '" + type + "' })\n    " + p.n + "!: " + p.t + ";";
    }).join('\n\n    ');

    write(path.join(basePath, `infrastructure/entities/${lEntity}.typeorm.entity.ts`), `
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('${m.mod}')
export class ${dEntity}Entity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    ${ormProps}

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
`);

    const mapToDomain = m.props.map(p => "entity." + p.n).join(',\n            ');
    const mapToEntity = m.props.map(p => "entity." + p.n + " = domain." + p.n + ";").join('\n        ');

    write(path.join(basePath, `infrastructure/mappers/${lEntity}.mapper.ts`), `
import { ${dEntity} } from '../../domain/entities/${lEntity}.entity';
import { ${dEntity}Entity } from '../entities/${lEntity}.typeorm.entity';

export class ${dEntity}Mapper {
    static toDomain(entity: ${dEntity}Entity): ${dEntity} {
        return new ${dEntity}(
            entity.id,
            ${mapToDomain},
            entity.createdAt,
            entity.updatedAt
        );
    }

    static toEntity(domain: ${dEntity}): ${dEntity}Entity {
        const entity = new ${dEntity}Entity();
        if (domain.id) entity.id = domain.id;
        ${mapToEntity}
        return entity;
    }
}
`);

    write(path.join(basePath, `infrastructure/adapters/output/persistence/${lEntity}.repository.adapter.ts`), `
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ${dEntity}RepositoryPort, PaginatedResult } from '../../../../domain/ports/output/${lEntity}.repository.port';
import { ${dEntity} } from '../../../../domain/entities/${lEntity}.entity';
import { ${dEntity}Entity } from '../../../entities/${lEntity}.typeorm.entity';
import { ${dEntity}Mapper } from '../../../mappers/${lEntity}.mapper';

@Injectable()
export class ${dEntity}RepositoryAdapter implements ${dEntity}RepositoryPort {
    constructor(
        @InjectRepository(${dEntity}Entity)
        private readonly repository: Repository<${dEntity}Entity>
    ) {}

    async findAll(page: number, limit: number): Promise<PaginatedResult<${dEntity}>> {
        const [entities, total] = await this.repository.findAndCount({ skip: (page - 1) * limit, take: limit });
        return { data: entities.map(${dEntity}Mapper.toDomain), total, page, limit };
    }

    async findById(id: string): Promise<${dEntity} | null> {
        const entity = await this.repository.findOne({ where: { id: id as any } });
        return entity ? ${dEntity}Mapper.toDomain(entity) : null;
    }

    async save(domain: ${dEntity}): Promise<${dEntity}> {
        let entity = ${dEntity}Mapper.toEntity(domain);
        const saved = await this.repository.save(entity);
        return ${dEntity}Mapper.toDomain(saved);
    }
}
`);

    const dtoProps = m.props.map(p => {
        let decorator = '@IsString()';
        if (p.t === 'number') decorator = '@IsNumber()';
        else if (p.t === 'boolean') decorator = '@IsBoolean()';
        return "@ApiProperty()\n    " + decorator + "\n    @IsNotEmpty()\n    " + p.n + "!: " + p.t + ";";
    }).join('\n\n    ');

    write(path.join(basePath, `infrastructure/adapters/input/http/dtos/create-${lEntity}.dto.ts`), `
import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Create${dEntity}Dto {
    ${dtoProps}
}
`);

    write(path.join(basePath, `infrastructure/adapters/input/http/${m.mod}.controller.ts`), `
import { Controller, Get, Post, Body, Param, Query, Inject, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Create${dEntity}Dto } from './dtos/create-${lEntity}.dto';
import { Find${dEntity}UseCase } from '../../../../domain/ports/input/find-${lEntity}.use-case';
import { Create${dEntity}UseCase } from '../../../../domain/ports/input/create-${lEntity}.use-case';

@ApiTags('${m.mod}')
@ApiBearerAuth()
@Controller('${m.mod}')
export class ${dEntity}Controller {
    constructor(
        @Inject('Find${dEntity}UseCase') private readonly findUseCase: Find${dEntity}UseCase,
        @Inject('Create${dEntity}UseCase') private readonly createUseCase: Create${dEntity}UseCase
    ) {}

    @Post()
    @ApiOperation({ summary: 'Crear ${lEntity}' })
    async create(@Body() dto: Create${dEntity}Dto) {
        const data = await this.createUseCase.create(dto);
        return { statusCode: HttpStatus.CREATED, message: 'Creado', data };
    }

    @Get()
    @ApiOperation({ summary: 'Listar ${m.mod} paginado' })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    async findAll(@Query('page') page: string = '1', @Query('limit') limit: string = '10') {
        const paginatedData = await this.findUseCase.findAll(parseInt(page, 10), parseInt(limit, 10));
        return { statusCode: HttpStatus.OK, message: 'Listado', data: paginatedData.data, total: paginatedData.total, page: paginatedData.page, limit: paginatedData.limit };
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener por ID' })
    async findById(@Param('id') id: string) {
        const data = await this.findUseCase.findById(id);
        return { statusCode: HttpStatus.OK, message: 'Encontrado', data };
    }
}
`);

    write(path.join(basePath, `infrastructure/${m.mod}.module.ts`), `
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ${dEntity}Entity } from './entities/${lEntity}.typeorm.entity';
import { ${dEntity}Controller } from './adapters/input/http/${m.mod}.controller';
import { ${dEntity}Service } from '../application/services/${m.mod}.service';
import { ${dEntity}RepositoryAdapter } from './adapters/output/persistence/${lEntity}.repository.adapter';

@Module({
    imports: [TypeOrmModule.forFeature([${dEntity}Entity])],
    controllers: [${dEntity}Controller],
    providers: [
        { provide: '${dEntity}RepositoryPort', useClass: ${dEntity}RepositoryAdapter },
        { provide: 'Find${dEntity}UseCase', useFactory: (repo) => new ${dEntity}Service(repo), inject: ['${dEntity}RepositoryPort'] },
        { provide: 'Create${dEntity}UseCase', useFactory: (repo) => new ${dEntity}Service(repo), inject: ['${dEntity}RepositoryPort'] }
    ],
    exports: ['${dEntity}RepositoryPort']
})
export class ${m.mod}Module {}
`);
}
console.log("All modules generated successfully.");
