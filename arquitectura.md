# Diagrama de Arquitectura — SGM Backend API

## ¿Qué es el Diagrama de Arquitectura?

El **Diagrama de Arquitectura** muestra cómo está organizado el sistema por **capas de software**: quién llama a quién, dónde vive cada responsabilidad y cómo fluye la información desde el cliente hasta la base de datos. **No muestra servidores ni infraestructura cloud** — eso es el Diagrama de Despliegue.

---

## Patrón Arquitectónico: Hexagonal (Ports & Adapters)

El proyecto sigue la **Arquitectura Hexagonal**, también llamada Ports & Adapters o Clean Architecture. La regla fundamental es:

> **La capa interna NO conoce la capa externa.** El dominio no sabe que existe NestJS, TypeORM ni PostgreSQL.

Las dependencias siempre van hacia adentro:

```
INFRAESTRUCTURA  →  APLICACIÓN  →  DOMINIO
    (conoce todo)      (conoce dominio)    (no conoce nada externo)
```

---

## Las 3 Capas del Sistema

### CAPA 1 — DOMINIO (`domain/`)

Es el núcleo del sistema. No importa ningún framework externo.

| Carpeta | Contenido | Ejemplo |
|---|---|---|
| `domain/entities/` | Entidades de negocio puras (clases TypeScript sin decoradores ORM) | `Item`, `Usuario`, `Solicitud` |
| `domain/ports/input/` | Interfaces de casos de uso (lo que la app puede hacer) | `ILoginUseCase`, `ICrearItemUseCase` |
| `domain/ports/output/` | Interfaces de repositorios (cómo la app accede a datos) | `IAuthRepository`, `IItemRepository` |
| `domain/exceptions/` | Excepciones propias del negocio | `InvalidCredentialsException`, `ItemNotFoundException` |

### CAPA 2 — APLICACIÓN (`application/`)

Orquesta la lógica de negocio implementando los casos de uso del dominio.

| Carpeta | Contenido | Ejemplo |
|---|---|---|
| `application/services/` | Clases que implementan los ports/input del dominio | `AuthService`, `ItemsService` |

Los services reciben los repositorios mediante inyección de dependencias (nunca los instancian directamente).

### CAPA 3 — INFRAESTRUCTURA (`infrastructure/`)

Todo lo que depende de tecnología concreta: HTTP, base de datos, JWT, bcrypt.

| Carpeta | Contenido | Ejemplo |
|---|---|---|
| `infrastructure/adapters/input/http/` | Controllers NestJS que reciben peticiones HTTP | `AuthController`, `ItemsController` |
| `infrastructure/adapters/input/http/dtos/` | DTOs de validación (class-validator) | `LoginDto`, `CreateItemDto` |
| `infrastructure/adapters/output/persistence/` | Repositorios TypeORM (implementan ports/output del dominio) | `AuthUserRepository`, `ItemRepository` |
| `infrastructure/adapters/output/providers/` | Proveedores externos (JWT, bcrypt, email) | `JwtTokenProvider`, `BcryptPasswordProvider` |
| `infrastructure/entities/` | Entidades ORM (`@Entity` de TypeORM) — mapean clases a tablas PostgreSQL | `ItemOrmEntity`, `UsuarioOrmEntity` |
| `infrastructure/mappers/` | Convierten OrmEntity ↔ DomainEntity | `ItemMapper` |
| `infrastructure/module.ts` | Módulo NestJS que registra todo lo anterior | `ItemsModule` |

---

## Estructura de Carpetas de un Módulo (Patrón Repetido en los 31 Módulos)

```
src/
└── items/                          ← nombre del módulo
    ├── domain/
    │   ├── entities/
    │   │   └── item.domain.entity.ts        ← clase pura TypeScript
    │   ├── exceptions/
    │   │   └── item.exceptions.ts           ← ItemNotFoundException, etc.
    │   └── ports/
    │       ├── input/
    │       │   └── item.use-case.ts         ← interface ICrearItemUseCase
    │       └── output/
    │           └── item.repository.port.ts  ← interface IItemRepository
    ├── application/
    │   └── services/
    │       └── items.service.ts             ← implementa ICrearItemUseCase
    └── infrastructure/
        ├── adapters/
        │   ├── input/
        │   │   └── http/
        │   │       ├── items.controller.ts  ← @Controller('items')
        │   │       └── dtos/
        │   │           ├── create-item.dto.ts
        │   │           └── update-item.dto.ts
        │   └── output/
        │       └── persistence/
        │           └── item.repository.ts   ← implementa IItemRepository con TypeORM
        ├── entities/
        │   └── item.orm-entity.ts           ← @Entity('item') TypeORM
        ├── mappers/
        │   └── item.mapper.ts
        └── items.module.ts                  ← @Module NestJS
```

---

## Módulos del Sistema (31 módulos)

Agrupados por dominio de negocio:

### Módulo Transversal / Core
| Módulo | Ruta | Responsabilidad |
|---|---|---|
| `core` | `src/core/` | Filtros globales (`DomainExceptionFilter`), decoradores compartidos |
| `shared` | `src/shared/` | Utilidades y tipos compartidos entre módulos |

### Módulo de Autenticación y Seguridad
| Módulo | Ruta | Responsabilidad |
|---|---|---|
| `auth` | `src/auth/` | Login, refresh token, JWT strategy, guards globales |
| `roles` | `src/roles/` | CRUD de roles del sistema |
| `permisos` | `src/permisos/` | CRUD de permisos (acciones granulares) |
| `usuario-permisos` | `src/usuario-permisos/` | Asignación de permisos individuales a usuarios |
| `usuarios` | `src/usuarios/` | CRUD de usuarios del sistema |

### Módulo Organizacional
| Módulo | Ruta | Responsabilidad |
|---|---|---|
| `sedes` | `src/sedes/` | Sedes físicas de la organización |
| `centros` | `src/centros/` | Centros de formación SENA |
| `areas` | `src/areas/` | Áreas dentro de un centro |
| `programas` | `src/programas/` | Programas de formación |
| `fichas` | `src/fichas/` | Fichas de aprendizaje (grupos) |
| `sitios` | `src/sitios/` | Almacenes, aulas, laboratorios (ubicaciones físicas) |

### Módulo de Catálogo e Inventario
| Módulo | Ruta | Responsabilidad |
|---|---|---|
| `categorias` | `src/categorias/` | Categorías de productos |
| `productos` | `src/productos/` | Catálogo de productos (tipos genéricos) |
| `items` | `src/items/` | Unidades físicas individuales (identificadas por placa SENA) |
| `inventario` | `src/inventario/` | Stock actual por sitio |
| `qr` | `src/qr/` | Generación de códigos QR para items |

### Módulo de Solicitudes y Operaciones
| Módulo | Ruta | Responsabilidad |
|---|---|---|
| `solicitudes` | `src/solicitudes/` | Solicitudes de préstamo/entrega |
| `detalle-solicitud` | `src/detalle-solicitud/` | Items incluidos en cada solicitud |
| `prestamos` | `src/prestamos/` | Préstamos activos de items |
| `devoluciones` | `src/devoluciones/` | Registro de devoluciones |
| `asignaciones` | `src/asignaciones/` | Asignaciones permanentes a fichas/usuarios |
| `traslados` | `src/traslados/` | Traslado de items entre sitios |
| `novedades` | `src/novedades/` | Novedades sobre el estado de un item (daño, pérdida) |
| `ordenes-compra` | `src/ordenes-compra/` | Órdenes de compra de nuevos items |

### Módulo de Movimientos y Trazabilidad
| Módulo | Ruta | Responsabilidad |
|---|---|---|
| `tipos-movimiento` | `src/tipos-movimiento/` | Catálogo de tipos de movimiento (módulo huérfano — ya no tiene tabla que lo consuma tras eliminar `movimientos`) |
| `kardex` | `src/kardex/` | Historial cronológico de movimientos por item |
| `chequeos` | `src/chequeos/` | Chequeos periódicos de inventario |
| `items-chequeo` | `src/items-chequeo/` | Items verificados en cada chequeo |
| `actas` | `src/actas/` | Actas generadas al cierre de operaciones |
| `notificaciones` | `src/notificaciones/` | Notificaciones internas del sistema |
| `reportes` | `src/reportes/` | Generación de reportes PDF/Excel |

---

## Middleware Global (Pipeline de una Petición HTTP)

Toda petición HTTP pasa por este pipeline antes de llegar al controller:

```
Cliente HTTP
    │
    ▼
[1] ThrottlerGuard ─── Límite: 100 req/min por IP. Si se excede → 429 Too Many Requests
    │
    ▼
[2] JwtAuthGuard ────── Verifica Bearer token JWT
    │                   Si ruta tiene @Public() → pasa directo (sin verificar token)
    │                   Si token inválido/ausente → 401 Unauthorized
    ▼
[3] ValidationPipe ──── Valida el body con class-validator
    │                   Si el DTO no pasa validación → 400 Bad Request (automático)
    ▼
[4] Controller ─────── Ejecuta el método del controller
    │
    ▼
[5] DomainExceptionFilter ── Intercepta excepciones de dominio y las convierte a HTTP
    │  InvalidCredentialsException → 401
    │  NotFoundException           → 404
    │  ForbiddenException          → 403
    │  *Exception                  → 400
    │  Error genérico              → 500
    ▼
Respuesta JSON al cliente
```

---

## Flujo Completo de una Petición: Login

Este flujo muestra cómo viajan los datos a través de todas las capas:

```
[Cliente] POST /auth/login  { correo, contrasena }
    │
    ▼ [INFRAESTRUCTURA - Input Adapter]
AuthController.login(dto: LoginDto)
    │  @Public()  →  JwtAuthGuard lo deja pasar sin verificar token
    │
    ▼ [APLICACIÓN]
LoginUseCase.execute(correo, contrasena)
  = AuthService.execute(correo, contrasena)
    │
    ├── [INFRAESTRUCTURA - Output Adapter]
    │   AuthUserRepository.findUserByEmail(correo)
    │       │
    │       ▼ [BASE DE DATOS]
    │       TypeORM → SELECT * FROM usuario WHERE correo = $1
    │       Mapea UsuarioOrmEntity → AuthUser (dominio)
    │
    ├── [DOMINIO]
    │   Valida: usuario existe, estado=true
    │   BcryptPasswordProvider.compare(contrasena, passwordHash)
    │
    └── [INFRAESTRUCTURA - Output Adapter]
        JwtTokenProvider.generateTokens(userId, roles)
            │
            ▼
        { accessToken: "eyJ...", refreshToken: "eyJ..." }
    │
    ▼ [INFRAESTRUCTURA - Input Adapter]
AuthController devuelve 200 OK con los tokens
    │
    ▼
[Cliente] recibe los tokens → los guarda → los envía en futuros requests como Bearer
```

---

## Flujo Completo de una Petición Protegida (ejemplo: GET /items)

```
[Cliente] GET /items  Authorization: Bearer eyJ...
    │
    ▼ [INFRAESTRUCTURA - Guards]
ThrottlerGuard: ¿límite OK? → sí, continúa
    │
    ▼
JwtAuthGuard: ¿token válido? → sí → extrae { userId, roles } del payload JWT
    │
    ▼ [INFRAESTRUCTURA - Input Adapter]
ItemsController.findAll()
    │  (tiene acceso a req.user = { userId, roles })
    │
    ▼ [APLICACIÓN]
ItemsService.findAll()
    │
    ▼ [INFRAESTRUCTURA - Output Adapter]
ItemRepository.findAll()
    │
    ▼ [BASE DE DATOS]
TypeORM → SELECT * FROM item LEFT JOIN producto LEFT JOIN sitio
    │
    ▼
ItemMapper.toDomain(ormEntities[]) → Item[] (dominio)
    │
    ▼
Controller devuelve 200 OK con el arreglo de items
```

---

## Stack Tecnológico Completo

| Categoría | Tecnología | Versión | Uso |
|---|---|---|---|
| **Framework** | NestJS | 11 | Framework principal del backend |
| **Lenguaje** | TypeScript | 5.7 | Tipado estático |
| **Base de datos** | PostgreSQL | 16 | Almacenamiento principal |
| **ORM** | TypeORM | 0.3 | Mapeo objeto-relacional |
| **Autenticación** | Passport + passport-jwt | 0.7 / 4.0 | Estrategia JWT |
| **Tokens** | @nestjs/jwt | 11 | Firma y verificación JWT |
| **Cifrado** | bcrypt | 6.0 | Hash de contraseñas |
| **Rate Limiting** | @nestjs/throttler | 6.5 | Protección contra flood |
| **Colas** | BullMQ + ioredis | 5.73 / 5.10 | Procesamiento asíncrono |
| **Email** | nodemailer | 8.0 | Envío de correos |
| **Reportes PDF** | pdfmake / pdfkit | 0.1 / 0.18 | Generación de documentos |
| **Reportes Excel** | exceljs | 4.4 | Exportación a hoja de cálculo |
| **QR** | (módulo qr) | — | Generación de códigos QR |
| **Documentación API** | Swagger (@nestjs/swagger) | 11.2 | Documentación automática |
| **Validación** | class-validator / class-transformer | 0.14 / 0.5 | Validación de DTOs |
| **Config** | @nestjs/config + joi | 4.0 / 18.1 | Variables de entorno validadas |

---

## Diagrama en Mermaid (para importar a Miro/Lucidchart/Draw.io)

El siguiente diagrama muestra la arquitectura hexagonal. Puedes pegarlo en:
- **Mermaid Live Editor**: https://mermaid.live
- **Miro**: bloque de código con sintaxis Mermaid
- **Lucidchart / Draw.io**: tienen importador de Mermaid

```mermaid
graph TB
    subgraph CLIENTE["🖥️  CLIENTE (Frontend / Postman)"]
        C[HTTP Request\nBearer Token]
    end

    subgraph PIPELINE["⚙️  PIPELINE GLOBAL"]
        TG[ThrottlerGuard\n100 req/min]
        JG[JwtAuthGuard\nPassport JWT]
        VP[ValidationPipe\nclass-validator]
        DEF[DomainExceptionFilter\nmapea excepciones → HTTP]
    end

    subgraph INFRA_IN["🔌  INFRAESTRUCTURA — Adaptadores de Entrada"]
        CTRL[Controllers NestJS\n@Controller + @Public/@Roles]
        DTO[DTOs\nclass-validator]
    end

    subgraph APP["📋  APLICACIÓN — Casos de Uso"]
        SVC[Services\nOrquestan la lógica]
    end

    subgraph DOMAIN["🏛️  DOMINIO — Núcleo del Negocio"]
        ENT[Entidades de Dominio\nclases TypeScript puras]
        PORTS_IN[Ports Input\nInterfaces de Use Cases]
        PORTS_OUT[Ports Output\nInterfaces de Repositorios]
        EXC[Excepciones de Dominio\nNotFoundException etc.]
    end

    subgraph INFRA_OUT["💾  INFRAESTRUCTURA — Adaptadores de Salida"]
        REPO[Repositorios TypeORM\nimplementan Ports Output]
        ORM[ORM Entities\n@Entity TypeORM]
        PROV[Providers\nJWT · bcrypt · email]
        MAP[Mappers\nOrmEntity ↔ DomainEntity]
    end

    subgraph EXTERNAL["🗄️  SERVICIOS EXTERNOS"]
        PG[(PostgreSQL 16\nBase de datos)]
        REDIS[(Redis\nColas BullMQ)]
        SMTP[SMTP Server\nEmail)]
    end

    C --> TG
    TG --> JG
    JG --> VP
    VP --> CTRL
    CTRL --> DTO
    CTRL --> SVC
    SVC --> PORTS_IN
    PORTS_IN --> ENT
    PORTS_IN --> PORTS_OUT
    PORTS_OUT --> REPO
    REPO --> ORM
    REPO --> MAP
    MAP --> ENT
    SVC --> PROV
    ORM --> PG
    REPO --> PG
    PROV --> REDIS
    PROV --> SMTP
    EXC --> DEF
    DEF --> C
```

---

## Cómo Hacer el Diagrama Manualmente en Miro

Si prefieres dibujarlo a mano en Miro con formas visuales, sigue estos pasos:

### Paso 1 — Crear los bloques de capas
Dibuja **4 bloques verticales** de izquierda a derecha con colores distintos:

| Bloque | Color sugerido | Contenido |
|---|---|---|
| **Cliente** | Gris | Navegador / Postman / App móvil |
| **Infraestructura (entrada)** | Azul claro | Controllers, DTOs, Guards, Filters |
| **Aplicación** | Amarillo | Services (Use Cases) |
| **Dominio** | Verde | Entities, Ports, Exceptions |
| **Infraestructura (salida)** | Azul oscuro | Repositories, ORM Entities, Providers |
| **Externos** | Rojo/Naranja | PostgreSQL, Redis, SMTP |

### Paso 2 — Dentro del bloque de Infraestructura (entrada)
Añade estas cajas en orden vertical (de arriba a abajo, representando el pipeline):
1. `ThrottlerGuard` — límite de velocidad
2. `JwtAuthGuard` — validación JWT
3. `ValidationPipe` — validación de DTOs
4. `Controller` — recibe la petición
5. `DomainExceptionFilter` — maneja errores

### Paso 3 — Conectar con flechas
- Flecha **sólida →** para llamadas normales (request)
- Flecha **punteada ←** para respuestas
- Flecha **roja →** para excepciones/errores

### Paso 4 — Añadir los módulos como subelementos
Dentro del bloque de Aplicación, puedes añadir una lista de los 31 módulos agrupados por dominio (como se muestra en la sección "Módulos del Sistema" de este documento).

---

## Reglas de Arquitectura que Debe Reflejar el Diagrama

Estas reglas son fundamentales del patrón hexagonal y deben ser visibles en el diagrama:

1. **Las flechas van de afuera hacia adentro**: Infraestructura → Aplicación → Dominio. Nunca al revés.
2. **El dominio no tiene flechas saliendo hacia infraestructura**: Solo define interfaces (ports), no implementaciones.
3. **Los controllers no llaman directamente a los repositorios**: Siempre pasan por el Service (Application layer).
4. **Los repositorios no conocen los controllers**: Solo conocen las interfaces del dominio (IItemRepository).
5. **Los ORM Entities y las Domain Entities son clases separadas**: El mapper las convierte entre sí.

---

## Resumen Visual de la Arquitectura

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        SGM BACKEND — ARQUITECTURA HEXAGONAL                  │
├─────────────┬───────────────────────┬─────────────┬────────────────────────┤
│ INFRA.      │  INFRA. ENTRADA       │ APLICACIÓN  │ DOMINIO                │
│ EXTERNA     │                       │             │                        │
│             │ ThrottlerGuard        │             │ Entities               │
│ PostgreSQL  │ JwtAuthGuard      ───▶│ Services    │ (Item, Usuario...)     │
│ Redis       │ ValidationPipe    ◀───│ (orquestan) │                        │
│ SMTP        │ Controllers           │             │ Ports Input/Output     │
│             │ DTOs                  │             │ (interfaces)           │
│             │ DomainExceptionFilter │             │                        │
│             │                       │             │ Exceptions             │
│             │           INFRA. SALIDA             │                        │
│             │ Repositories ◀────────│─────────────┤                        │
│◀────────────│ ORM Entities          │             │                        │
│             │ Mappers               │             │                        │
│             │ Providers (JWT/bcrypt)│             │                        │
└─────────────┴───────────────────────┴─────────────┴────────────────────────┘
```

---

## Corrección 1 — Pipeline Completo de Guards

El diagrama original solo muestra `JwtAuthGuard`. En el código existen **3 guards** que se aplican en secuencia. El pipeline correcto es:

```
ThrottlerGuard → JwtAuthGuard → RolesGuard → PermisosGuard → ValidationPipe → Controller
```

### Cómo funciona cada guard:

| Guard | Archivo | Qué verifica | Si falla |
|---|---|---|---|
| `ThrottlerGuard` | global (app.module.ts) | Máximo 100 requests/min por IP | 429 Too Many Requests |
| `JwtAuthGuard` | `guards/jwt-auth.guard.ts` | Token Bearer válido. Si la ruta tiene `@Public()` deja pasar sin verificar | 401 Unauthorized |
| `RolesGuard` | `guards/roles.guard.ts` | Si el endpoint tiene `@Roles('Admin')`, verifica que el usuario tenga ese rol en su token JWT | 403 Forbidden |
| `PermisosGuard` | `guards/permisos.guard.ts` | Si el endpoint tiene `@RequierePermiso('ver_inventario')`, consulta en BD si el usuario tiene ese permiso (por rol o asignación individual). El rol `Administrador` tiene todos los permisos salvo denegación explícita | 403 Forbidden |

### Diagrama del pipeline completo:

```
[Request]
    │
    ▼
ThrottlerGuard ──── ¿100 req/min superados? ──── Sí ──→ 429
    │ No
    ▼
JwtAuthGuard ─────── ¿@Public()? ──── Sí ──────────────→ [pasa directo al Controller]
    │ No
    │ ¿Token Bearer válido?
    ├── No ──→ 401 Unauthorized
    │ Sí → extrae { userId, roles } del payload JWT
    ▼
RolesGuard ──────── ¿@Roles() en el endpoint? ── No ──→ [pasa directo]
    │ Sí
    │ ¿user.roles incluye el rol requerido?
    ├── No ──→ 403 Forbidden
    │ Sí
    ▼
PermisosGuard ───── ¿@RequierePermiso() en el endpoint? ── No ──→ [pasa directo]
    │ Sí
    │ ¿usuario es Administrador? ── Sí ── ¿hay DENY explícito en BD? ── Sí ──→ 403
    │                              Sí y sin DENY ──────────────────────────────→ [pasa]
    │ No → consulta usuario_permisos y rol_permisos en BD
    ├── Sin acceso ──→ 403 Forbidden
    │ Con acceso
    ▼
ValidationPipe ──── Valida body/params con class-validator
    ├── Inválido ──→ 400 Bad Request
    │ Válido
    ▼
Controller ──────── Ejecuta el método
```

### Lógica ReBAC del PermisosGuard (prioridad de permisos):

```
1. ¿El usuario es Administrador?
   → Sí: tiene todo. ¿Hay una denegación explícita en usuario_permisos? → 403
   → No: continúa

2. ¿Existe un registro en usuario_permisos para este usuario + permiso?
   → activo = true  → PERMITIDO
   → activo = false → DENEGADO (sobrescribe al rol)
   → no existe      → continúa

3. ¿El rol del usuario tiene ese permiso en rol_permisos?
   → Sí → PERMITIDO
   → No → continúa

4. Fallback: ¿El usuario es Instructor y el permiso empieza con 'ver_'?
   → Sí → PERMITIDO (permisos de solo lectura por defecto)
   → No → DENEGADO → 403
```

---

## Corrección 2 — Flujo Asíncrono con BullMQ

El diagrama actual muestra Redis solo como base de datos en "Externos". En realidad Redis también alimenta un **sistema de colas asíncronas** con BullMQ, que corre en paralelo al flujo HTTP principal.

### Dos flujos distintos:

```
FLUJO HTTP (síncrono) — responde en la misma request:
─────────────────────────────────────────────────────
Cliente → Guards → Controller → Service → Repository → PostgreSQL
                                        ↑
                                  responde 200 OK
                                  con el resultado


FLUJO DE COLAS (asíncrono) — corre en background:
────────────────────────────────────────────────────
Service ──→ BullMQ Producer ──→ [Cola Redis] ──→ BullMQ Consumer (Worker)
                                                        │
                                              ┌─────────┴──────────┐
                                              ▼                     ▼
                                        nodemailer              Generación
                                        (envío email            reportes PDF
                                         via SMTP)              / Excel
```

### Cuándo se usa cada flujo:

| Operación | Flujo | Motivo |
|---|---|---|
| Crear un item | HTTP síncrono | Rápido, responde de inmediato |
| Aprobar un traslado | HTTP síncrono + Cola | Actualiza BD (síncrono) + notifica usuarios (cola) |
| Generar reporte Excel de inventario | Cola | Puede tardar segundos/minutos |
| Enviar correo de bienvenida | Cola | No bloquea la respuesta al cliente |
| Notificación de novedad | Cola | Se procesa cuando haya capacidad |

### Componentes del sistema de colas:

```
src/
├── notificaciones/     ← Consumer/Worker que procesa jobs de notificación
├── reportes/           ← Consumer/Worker que procesa jobs de generación de reportes
└── [módulo que dispara]
    └── service.ts      ← Producer: encola el job en Redis con BullMQ
```

---

## Corrección 3 — Mapa de los 31 Módulos del Sistema

El diagrama muestra la arquitectura genérica pero no identifica los módulos concretos. Este es el mapa completo de todos los módulos y cómo se relacionan entre sí:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          SGM — 31 MÓDULOS                                │
├─────────────────────────────────────────────────────────────────────────┤
│  TRANSVERSAL                                                             │
│  ┌──────┐  ┌────────┐                                                   │
│  │ core │  │ shared │                                                   │
│  └──────┘  └────────┘                                                   │
├─────────────────────────────────────────────────────────────────────────┤
│  SEGURIDAD Y ACCESO                                                      │
│  ┌──────┐  ┌────────┐  ┌──────────┐  ┌─────────────────┐  ┌─────────┐  │
│  │ auth │  │ roles  │  │ permisos │  │ usuario-permisos│  │usuarios │  │
│  └──────┘  └────────┘  └──────────┘  └─────────────────┘  └─────────┘  │
├─────────────────────────────────────────────────────────────────────────┤
│  ORGANIZACIÓN                                                            │
│  ┌───────┐  ┌─────────┐  ┌───────┐  ┌──────────┐  ┌────────┐  ┌──────┐ │
│  │ sedes │  │ centros │  │ areas │  │ programas│  │ fichas │  │sitios│ │
│  └───────┘  └─────────┘  └───────┘  └──────────┘  └────────┘  └──────┘ │
├─────────────────────────────────────────────────────────────────────────┤
│  CATÁLOGO E INVENTARIO                                                   │
│  ┌───────────┐  ┌──────────┐  ┌───────┐  ┌───────────┐  ┌────┐         │
│  │categorias │  │productos │  │ items │  │inventario │  │ qr │         │
│  └───────────┘  └──────────┘  └───────┘  └───────────┘  └────┘         │
├─────────────────────────────────────────────────────────────────────────┤
│  SOLICITUDES Y OPERACIONES                                               │
│  ┌───────────┐  ┌──────────────────┐  ┌──────────┐  ┌─────────────┐    │
│  │solicitudes│  │detalle-solicitud │  │ prestamos│  │devoluciones │    │
│  └───────────┘  └──────────────────┘  └──────────┘  └─────────────┘    │
│  ┌─────────────┐  ┌──────────┐  ┌──────────┐  ┌───────────────┐        │
│  │asignaciones │  │traslados │  │novedades │  │ ordenes-compra│        │
│  └─────────────┘  └──────────┘  └──────────┘  └───────────────┘        │
├─────────────────────────────────────────────────────────────────────────┤
│  MOVIMIENTOS Y TRAZABILIDAD                                              │
│  ┌─────────────────┐  ┌────────┐  ┌─────────┐                          │
│  │tipos-movimiento │  │kardex  │  │chequeos │                          │
│  └─────────────────┘  └────────┘  └─────────┘                          │
│  ┌───────────────┐  ┌───────┐  ┌───────────────┐  ┌──────────────────┐  │
│  │ items-chequeo │  │actas  │  │notificaciones │  │    reportes      │  │
│  └───────────────┘  └───────┘  └───────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

### Dependencias clave entre módulos (quién necesita a quién):

```
usuarios ←── auth              (auth consulta usuario para login)
roles    ←── auth              (auth incluye rol en el token JWT)
permisos ←── usuario-permisos  (asignación de permisos individuales)
permisos ←── roles             (cada rol tiene permisos asignados)

categorias ←── productos       (producto pertenece a categoría)
productos  ←── items           (item es una unidad de un producto)
sitios     ←── items           (item está ubicado en un sitio)
items      ←── inventario      (inventario agrega items por sitio)

fichas    ←── asignaciones     (asignación es para una ficha)
items     ←── asignaciones     (asignación-item vincula items a asignaciones)
usuarios  ←── solicitudes      (usuario crea una solicitud)
solicitudes ←── detalle-solicitud (detalle lista los items de la solicitud)
solicitudes ←── prestamos      (préstamo origina de una solicitud)
prestamos   ←── devoluciones   (devolución cierra un préstamo)

items       ←── traslados      (traslado mueve un item entre sitios)
items       ←── novedades      (novedad reporta daño/pérdida de un item)
item        ←── kardex         (kardex registra cada movimiento cronológico del item)
chequeos    ←── items-chequeo  (items verificados en cada chequeo)
actas       ←── chequeos       (acta se genera al cerrar un chequeo)
```
