# Modelado de Base de Datos — SGM (Sistema de Gestión de Materiales)

**Motor:** PostgreSQL 16  
**ORM:** TypeORM 0.3  
**Convención de PKs:** todas las tablas usan `SERIAL PRIMARY KEY` con nombre `id_<tabla>`  
**Convención de FKs:** el nombre de la columna FK es `id_<tabla_referenciada>`

---

## Índice de tablas

| # | Tabla | Módulo |
|---|-------|--------|
| 1 | `centro` | Organizacional |
| 2 | `sede` | Organizacional |
| 3 | `area` | Organizacional |
| 4 | `programa` | Organizacional |
| 5 | `rol` | Seguridad |
| 6 | `permisos` | Seguridad |
| 7 | `rol_permisos` | Seguridad |
| 8 | `usuario` | Seguridad |
| 9 | `usuario_permisos` | Seguridad |
| 10 | `categoria` | Catálogo |
| 11 | `sitio` | Catálogo |
| 12 | `producto` | Catálogo |
| 13 | `item` | Inventario |
| 14 | `inventario` | Inventario |
| 15 | `ficha` | Formación |
| 16 | `asignacion` | Formación |
| 17 | `asignacion_item` | Formación |
| 18 | `solicitud` | Solicitudes |
| 19 | `detalle_solicitud` | Solicitudes |
| 20 | `devolucion` | Operaciones |
| 21 | `chequeo` | Operaciones |
| 22 | `item_chequeo` | Operaciones |
| 23 | `acta` | Operaciones |
| 24 | `tipo_movimiento` | Movimientos |
| 25 | `kardex` | Movimientos |
| 26 | `traslado` | Movimientos |
| 27 | `notificacion` | Seguimiento |
| 28 | `novedad` | Seguimiento |
| 29 | `prestamo` | Seguimiento |

---

## Mapa de relaciones (resumen)

```
centro          1 ──< N  sede
sede            1 ──< N  area
area            1 ──< N  programa
programa        1 ──< N  ficha

rol             1 ──< N  usuario
rol             1 ──< N  rol_permisos
permisos        1 ──< N  rol_permisos
usuario         1 ──< N  usuario_permisos
permisos        1 ──< N  usuario_permisos

categoria       1 ──< N  producto
centro          1 ──< N  sitio
usuario         1 ──< N  sitio            (como responsable)
producto        1 ──< N  item
sitio           1 ──< N  item
item            1 ──  1  inventario
sitio           1 ──< N  inventario

programa        1 ──< N  ficha
usuario         1 ──< N  ficha            (como responsable)
ficha           1 ──< N  asignacion
producto        1 ──< N  asignacion
usuario         1 ──< N  asignacion       (como usuario_asigna)
asignacion      1 ──< N  asignacion_item
item            1 ──< N  asignacion_item

usuario         1 ──< N  solicitud        (como solicitante)
usuario         1 ──< N  solicitud        (como aprobador)
ficha           1 ──< N  solicitud
producto        1 ──< N  solicitud
solicitud       1 ──< N  detalle_solicitud
producto        1 ──< N  detalle_solicitud

solicitud       1 ──  1  devolucion
item            1 ──< N  devolucion
solicitud       1 ──  1  chequeo
usuario         1 ──< N  chequeo
chequeo         1 ──< N  item_chequeo
item            1 ──< N  item_chequeo
solicitud       1 ──  1  acta
usuario         1 ──< N  acta

item            1 ──< N  kardex
usuario         1 ──< N  kardex
item            1 ──< N  traslado
sitio           1 ──< N  traslado         (como sitio_origen)
sitio           1 ──< N  traslado         (como sitio_destino)
usuario         1 ──< N  traslado         (como solicitante)
usuario         1 ──< N  traslado         (como aprobador)

usuario         1 ──< N  notificacion
item            1 ──< N  novedad
usuario         1 ──< N  novedad
item            1 ──< N  prestamo
usuario         1 ──< N  prestamo         (como solicitante)
usuario         1 ──< N  prestamo         (como responsable)
```

---

## Módulo Organizacional

---

### Tabla: `centro`

Centro de formación SENA. No tiene dependencias externas.

| Columna   | Tipo PostgreSQL | Nulo | Default | Descripción |
|-----------|----------------|------|---------|-------------|
| id_centro | SERIAL         | NO   | —       | PK          |
| nombre    | VARCHAR(150)   | NO   | —       | UNIQUE      |
| codigo    | VARCHAR(50)    | NO   | —       | UNIQUE. Código institucional |
| regional  | VARCHAR(100)   | NO   | —       |             |
| estado    | BOOLEAN        | NO   | true    |             |

**Foreign Keys:** ninguna

---

### Tabla: `sede`

Sede física perteneciente a un centro.

| Columna   | Tipo PostgreSQL | Nulo | Default | Descripción |
|-----------|----------------|------|---------|-------------|
| id_sede   | SERIAL         | NO   | —       | PK          |
| nombre    | VARCHAR(150)   | NO   | —       |             |
| direccion | VARCHAR(250)   | NO   | —       |             |
| id_centro | INTEGER        | NO   | —       | FK          |
| estado    | BOOLEAN        | NO   | true    |             |

**Foreign Keys:**
- `id_centro` → `centro(id_centro)` — ON DELETE CASCADE

**Relación:** muchas `sede` pertenecen a un `centro` (N:1)

---

### Tabla: `area`

Área académica o administrativa dentro de una sede.

| Columna  | Tipo PostgreSQL | Nulo | Default | Descripción |
|----------|----------------|------|---------|-------------|
| id_area  | SERIAL         | NO   | —       | PK          |
| nombre   | VARCHAR(150)   | NO   | —       | UNIQUE      |
| id_sede  | INTEGER        | SÍ   | NULL    | FK          |
| estado   | BOOLEAN        | NO   | true    |             |

**Foreign Keys:**
- `id_sede` → `sede(id_sede)` — ON DELETE SET NULL

**Relación:** muchas `area` pertenecen a una `sede` (N:1)

---

### Tabla: `programa`

Programa de formación agrupado dentro de un área.

| Columna     | Tipo PostgreSQL | Nulo | Default | Descripción |
|-------------|----------------|------|---------|-------------|
| id_programa | SERIAL         | NO   | —       | PK          |
| nombre      | VARCHAR(150)   | NO   | —       |             |
| codigo      | VARCHAR(50)    | NO   | —       | UNIQUE      |
| id_area     | INTEGER        | NO   | —       | FK          |
| estado      | BOOLEAN        | NO   | true    |             |

**Foreign Keys:**
- `id_area` → `area(id_area)` — ON DELETE CASCADE

**Relación:** muchos `programa` pertenecen a una `area` (N:1)

---

## Módulo de Seguridad y Acceso

Modelo ReBAC: los usuarios tienen un rol global y además pueden tener permisos individuales que complementan o sobreescriben los del rol.

---

### Tabla: `rol`

Rol base del sistema. No tiene dependencias externas.

| Columna | Tipo PostgreSQL | Nulo | Default | Descripción |
|---------|----------------|------|---------|-------------|
| id_rol  | SERIAL         | NO   | —       | PK          |
| nombre  | VARCHAR(100)   | NO   | —       | UNIQUE. Ej: Administrador, Instructor, Aprendiz |

**Foreign Keys:** ninguna

---

### Tabla: `permisos`

Permiso granular asociado a un módulo funcional. No tiene dependencias externas.

| Columna     | Tipo PostgreSQL | Nulo | Default | Descripción |
|-------------|----------------|------|---------|-------------|
| id_permiso  | SERIAL         | NO   | —       | PK          |
| nombre      | VARCHAR(100)   | NO   | —       | UNIQUE. Ej: ver_inventario, crear_solicitudes |
| descripcion | TEXT           | NO   | —       |             |
| modulo      | VARCHAR(100)   | NO   | —       | Módulo al que aplica. Ej: inventario, solicitudes |
| activo      | BOOLEAN        | NO   | true    |             |

**Foreign Keys:** ninguna

---

### Tabla: `rol_permisos`

Tabla de unión: permisos asignados a un rol. Relación muchos a muchos entre `rol` y `permisos`.

| Columna    | Tipo PostgreSQL | Nulo | Default | Descripción |
|------------|----------------|------|---------|-------------|
| id         | SERIAL         | NO   | —       | PK          |
| id_rol     | INTEGER        | NO   | —       | FK          |
| id_permiso | INTEGER        | NO   | —       | FK          |

**Foreign Keys:**
- `id_rol` → `rol(id_rol)` — ON DELETE CASCADE
- `id_permiso` → `permisos(id_permiso)` — ON DELETE CASCADE

**Relación:**
- un `rol` tiene muchos `rol_permisos` (1:N)
- un `permiso` aparece en muchos `rol_permisos` (1:N)

---

### Tabla: `usuario`

Usuario del sistema. Cada usuario tiene exactamente un rol.

| Columna    | Tipo PostgreSQL | Nulo | Default | Descripción |
|------------|----------------|------|---------|-------------|
| id_usuario | SERIAL         | NO   | —       | PK          |
| nombre     | VARCHAR(150)   | NO   | —       |             |
| correo     | VARCHAR(100)   | NO   | —       | UNIQUE. Usado para login |
| telefono   | VARCHAR(30)    | SÍ   | NULL    |             |
| documento  | VARCHAR(50)    | SÍ   | NULL    | Número de identificación |
| password   | VARCHAR        | NO   | —       | Hash bcrypt |
| estado     | BOOLEAN        | NO   | true    | false = cuenta bloqueada |
| id_rol     | INTEGER        | NO   | —       | FK          |

**Foreign Keys:**
- `id_rol` → `rol(id_rol)` — ON DELETE CASCADE

**Relación:** muchos `usuario` pertenecen a un `rol` (N:1)

---

### Tabla: `usuario_permisos`

Permisos adicionales asignados directamente a un usuario (complementan los del rol).

| Columna          | Tipo PostgreSQL | Nulo | Default            | Descripción |
|------------------|----------------|------|--------------------|-------------|
| id               | SERIAL         | NO   | —                  | PK          |
| id_usuario       | INTEGER        | NO   | —                  | FK          |
| id_permiso       | INTEGER        | NO   | —                  | FK          |
| activo           | BOOLEAN        | NO   | true               |             |
| fecha_asignacion | TIMESTAMP      | NO   | CURRENT_TIMESTAMP  | Automático  |

**Foreign Keys:**
- `id_usuario` → `usuario(id_usuario)` — ON DELETE CASCADE
- `id_permiso` → `permisos(id_permiso)` — ON DELETE CASCADE

**Relación:**
- un `usuario` tiene muchos `usuario_permisos` (1:N)
- un `permiso` está asignado a muchos usuarios vía `usuario_permisos` (1:N)

---

## Módulo de Catálogo e Inventario

---

### Tabla: `categoria`

Clasificación de productos. No tiene dependencias externas.

| Columna      | Tipo PostgreSQL | Nulo | Default | Descripción |
|--------------|----------------|------|---------|-------------|
| id_categoria | SERIAL         | NO   | —       | PK          |
| nombre       | VARCHAR(150)   | NO   | —       | UNIQUE      |

**Foreign Keys:** ninguna

---

### Tabla: `sitio`

Espacio físico donde se ubican o almacenan los ítems (bodega, aula, laboratorio, etc.).

| Columna            | Tipo PostgreSQL | Nulo | Default | Descripción |
|--------------------|----------------|------|---------|-------------|
| id_sitio           | SERIAL         | NO   | —       | PK          |
| nombre             | VARCHAR(150)   | NO   | —       |             |
| tipo               | VARCHAR(50)    | NO   | —       | BODEGA / AULA / LABORATORIO / OTRO |
| tipo_personalizado | VARCHAR(100)   | SÍ   | NULL    | Solo aplica cuando tipo = OTRO |
| codigo_lugar       | VARCHAR(50)    | SÍ   | NULL    | Código interno del lugar |
| id_responsable     | INTEGER        | SÍ   | NULL    | FK → usuario |
| id_centro          | INTEGER        | SÍ   | NULL    | FK → centro  |
| estado             | BOOLEAN        | NO   | true    |             |

**Foreign Keys:**
- `id_responsable` → `usuario(id_usuario)` — ON DELETE SET NULL
- `id_centro` → `centro(id_centro)` — ON DELETE CASCADE

**Relaciones:**
- un `usuario` puede ser responsable de muchos `sitio` (1:N)
- un `centro` alberga muchos `sitio` (1:N)

---

### Tabla: `producto`

Definición genérica de un material (tipo de bien, NO la unidad física). Un producto puede tener muchos ítems físicos.

| Columna           | Tipo PostgreSQL  | Nulo | Default | Descripción |
|-------------------|-----------------|------|---------|-------------|
| id_producto       | SERIAL          | NO   | —       | PK          |
| nombre            | VARCHAR(150)    | NO   | —       |             |
| descripcion       | TEXT            | SÍ   | NULL    |             |
| codigo_unspsc     | VARCHAR(50)     | SÍ   | NULL    | Código catálogo UNSPSC |
| SKU               | VARCHAR(100)    | SÍ   | NULL    | UNIQUE      |
| tipo_material     | VARCHAR(50)     | NO   | —       | CONSUMIBLE / DEVOLUTIVO |
| unidad_medida     | VARCHAR(50)     | NO   | —       | UNIDAD / CAJA / LITRO / etc. |
| es_psd            | BOOLEAN         | NO   | false   | Es producto de seguridad/dotación |
| fecha_vencimiento | DATE            | SÍ   | NULL    |             |
| id_categoria      | INTEGER         | NO   | —       | FK          |
| stock_minimo      | INTEGER         | NO   | 0       | Alerta cuando el stock baja de este valor |
| unidad_peso_bulto | VARCHAR(50)     | SÍ   | NULL    | KG / LB / etc. |
| peso_por_bulto    | DECIMAL(10,2)   | SÍ   | NULL    |             |
| id_sitio          | INTEGER         | SÍ   | NULL    | Sitio de almacenamiento por defecto (sin FK declarado) |

**Foreign Keys:**
- `id_categoria` → `categoria(id_categoria)` — ON DELETE CASCADE

**Relación:** muchos `producto` pertenecen a una `categoria` (N:1)

---

### Tabla: `item`

Unidad física individual de un producto. Cada ítem tiene su propio ciclo de vida (estado, ubicación, historial).

| Columna     | Tipo PostgreSQL | Nulo | Default       | Descripción |
|-------------|----------------|------|---------------|-------------|
| id_item     | SERIAL         | NO   | —             | PK          |
| codigo_sku  | VARCHAR(150)   | SÍ   | NULL          |             |
| placa_sena  | VARCHAR(100)   | SÍ   | NULL          | UNIQUE. Identificador físico SENA |
| estado      | VARCHAR(50)    | NO   | 'DISPONIBLE'  | DISPONIBLE / ASIGNADO / EN_PRESTAMO / EN_MANTENIMIENTO / DADO_DE_BAJA |
| id_producto | INTEGER        | NO   | —             | FK          |
| id_sitio    | INTEGER        | SÍ   | NULL          | FK          |

**Foreign Keys:**
- `id_producto` → `producto(id_producto)` — ON DELETE CASCADE
- `id_sitio` → `sitio(id_sitio)` — ON DELETE SET NULL

**Relaciones:**
- un `producto` tiene muchos `item` físicos (1:N)
- un `sitio` contiene muchos `item` (1:N)

---

### Tabla: `inventario`

Registro único de un ítem en el inventario. Relación uno a uno con `item`.

| Columna       | Tipo PostgreSQL | Nulo | Default | Descripción |
|---------------|----------------|------|---------|-------------|
| id_inventario | SERIAL         | NO   | —       | PK          |
| estado        | VARCHAR(50)    | NO   | —       | Estado del ítem en inventario |
| id_item       | INTEGER        | NO   | —       | FK. UNIQUE (un ítem aparece una sola vez) |
| id_sitio      | INTEGER        | NO   | —       | FK          |

**Foreign Keys:**
- `id_item` → `item(id_item)` — ON DELETE CASCADE
- `id_sitio` → `sitio(id_sitio)` — ON DELETE CASCADE

**Restricción:** `UNIQUE(id_item)` — garantiza que cada ítem tenga un único registro de inventario

**Relaciones:**
- un `item` tiene exactamente un registro en `inventario` (1:1)
- un `sitio` almacena muchos registros de `inventario` (1:N)

---

## Módulo de Fichas y Asignaciones

---

### Tabla: `ficha`

Grupo de formación (ficha SENA) con su programa y responsable.

| Columna        | Tipo PostgreSQL | Nulo | Default | Descripción |
|----------------|----------------|------|---------|-------------|
| id_ficha       | SERIAL         | NO   | —       | PK          |
| numero_ficha   | VARCHAR(50)    | NO   | —       | UNIQUE      |
| id_programa    | INTEGER        | NO   | —       | FK          |
| id_responsable | INTEGER        | SÍ   | NULL    | FK → usuario |
| ambiente       | VARCHAR(50)    | SÍ   | NULL    | Nombre del ambiente de formación |
| estado         | BOOLEAN        | NO   | true    |             |

**Foreign Keys:**
- `id_programa` → `programa(id_programa)` — ON DELETE CASCADE
- `id_responsable` → `usuario(id_usuario)` — ON DELETE SET NULL

**Relaciones:**
- un `programa` tiene muchas `ficha` (1:N)
- un `usuario` es responsable de muchas `ficha` (1:N)

---

### Tabla: `asignacion`

Asignación de un producto (en cantidad) a una ficha de formación. Registra quién asignó y cuándo.

| Columna           | Tipo PostgreSQL | Nulo | Default           | Descripción |
|-------------------|----------------|------|-------------------|-------------|
| id_asignacion     | SERIAL         | NO   | —                 | PK          |
| id_ficha          | INTEGER        | NO   | —                 | FK          |
| id_producto       | INTEGER        | NO   | —                 | FK          |
| cantidad          | INTEGER        | NO   | —                 | Cantidad de producto asignada |
| fecha_asignacion  | TIMESTAMP      | NO   | CURRENT_TIMESTAMP | Automático  |
| id_usuario_asigna | INTEGER        | NO   | —                 | FK → usuario que realiza la asignación |
| observacion       | TEXT           | SÍ   | NULL              |             |
| estado            | VARCHAR(20)    | NO   | 'ACTIVA'          | ACTIVA / FINALIZADA / CANCELADA |

**Foreign Keys:**
- `id_ficha` → `ficha(id_ficha)` — ON DELETE CASCADE
- `id_producto` → `producto(id_producto)` — ON DELETE CASCADE
- `id_usuario_asigna` → `usuario(id_usuario)` — ON DELETE CASCADE

**Relaciones:**
- una `ficha` tiene muchas `asignacion` (1:N)
- un `producto` aparece en muchas `asignacion` (1:N)
- un `usuario` realiza muchas `asignacion` (1:N)

---

### Tabla: `asignacion_item`

Detalle de los ítems físicos específicos entregados dentro de una asignación.

| Columna            | Tipo PostgreSQL | Nulo | Default | Descripción |
|--------------------|----------------|------|---------|-------------|
| id_asignacion_item | SERIAL         | NO   | —       | PK          |
| id_asignacion      | INTEGER        | NO   | —       | FK          |
| id_item            | INTEGER        | NO   | —       | FK          |

**Foreign Keys:**
- `id_asignacion` → `asignacion(id_asignacion)` — ON DELETE CASCADE
- `id_item` → `item(id_item)` — ON DELETE CASCADE

**Relaciones:**
- una `asignacion` tiene muchos `asignacion_item` (1:N)
- un `item` aparece en muchos `asignacion_item` (1:N)

---

## Módulo de Solicitudes

---

### Tabla: `solicitud`

Solicitud de materiales iniciada por un usuario. Puede ser de tipo préstamo, consumo o devolución.

| Columna            | Tipo PostgreSQL | Nulo | Default      | Descripción |
|--------------------|----------------|------|--------------|-------------|
| id_solicitud       | SERIAL         | NO   | —            | PK          |
| fecha              | TIMESTAMP      | NO   | —            |             |
| estado             | VARCHAR(50)    | NO   | 'PENDIENTE'  | PENDIENTE / APROBADA / RECHAZADA / ENTREGADA / CANCELADA |
| tipo               | VARCHAR(50)    | NO   | —            | PRESTAMO / CONSUMO / DEVOLUCION |
| observacion        | TEXT           | SÍ   | NULL         |             |
| id_usuario         | INTEGER        | NO   | —            | FK → usuario que solicita |
| id_usuario_aprueba | INTEGER        | SÍ   | NULL         | FK → usuario que aprueba o rechaza |
| id_ficha           | INTEGER        | SÍ   | NULL         | FK → ficha a la que va dirigida |
| id_producto        | INTEGER        | SÍ   | NULL         | FK → producto solicitado (solicitud simple) |
| cantidad           | INTEGER        | NO   | 1            | Para solicitudes simples de un producto |

**Foreign Keys:**
- `id_usuario` → `usuario(id_usuario)` — ON DELETE CASCADE
- `id_usuario_aprueba` → `usuario(id_usuario)` — ON DELETE SET NULL
- `id_ficha` → `ficha(id_ficha)` — ON DELETE CASCADE
- `id_producto` → `producto(id_producto)` — ON DELETE SET NULL

**Relaciones:**
- un `usuario` crea muchas `solicitud` (1:N)
- un `usuario` aprueba muchas `solicitud` (1:N)
- una `ficha` origina muchas `solicitud` (1:N)
- un `producto` es referenciado en muchas `solicitud` (1:N)

---

### Tabla: `detalle_solicitud`

Líneas de producto de una solicitud cuando incluye múltiples productos.

| Columna      | Tipo PostgreSQL | Nulo | Default | Descripción |
|--------------|----------------|------|---------|-------------|
| id_detalle   | SERIAL         | NO   | —       | PK          |
| cantidad     | INTEGER        | NO   | —       |             |
| id_solicitud | INTEGER        | NO   | —       | FK          |
| id_producto  | INTEGER        | NO   | —       | FK          |

**Foreign Keys:**
- `id_solicitud` → `solicitud(id_solicitud)` — ON DELETE CASCADE
- `id_producto` → `producto(id_producto)` — ON DELETE CASCADE

**Relaciones:**
- una `solicitud` tiene muchos `detalle_solicitud` (1:N)
- un `producto` aparece en muchos `detalle_solicitud` (1:N)

---

## Módulo de Operaciones

---

### Tabla: `devolucion`

Registro de devolución de un ítem. Cada solicitud tiene como máximo una devolución.

| Columna       | Tipo PostgreSQL | Nulo | Default           | Descripción |
|---------------|----------------|------|-------------------|-------------|
| id_devolucion | SERIAL         | NO   | —                 | PK          |
| fecha         | TIMESTAMP      | NO   | CURRENT_TIMESTAMP |             |
| estado        | VARCHAR(50)    | NO   | —                 | BUENO / REGULAR / DAÑADO / PERDIDO |
| observacion   | TEXT           | SÍ   | NULL              |             |
| id_solicitud  | INTEGER        | NO   | —                 | FK. UNIQUE  |
| id_item       | INTEGER        | NO   | —                 | FK          |

**Foreign Keys:**
- `id_solicitud` → `solicitud(id_solicitud)` — ON DELETE CASCADE
- `id_item` → `item(id_item)` — ON DELETE CASCADE

**Restricción:** `UNIQUE(id_solicitud)` — una solicitud tiene exactamente una devolución (1:1)

**Relaciones:**
- una `solicitud` genera como máximo una `devolucion` (1:1)
- un `item` aparece en muchas `devolucion` (1:N)

---

### Tabla: `chequeo`

Verificación del estado de los ítems al momento de la entrega. Cada solicitud tiene como máximo un chequeo.

| Columna      | Tipo PostgreSQL | Nulo | Default           | Descripción |
|--------------|----------------|------|-------------------|-------------|
| id_chequeo   | SERIAL         | NO   | —                 | PK          |
| fecha        | TIMESTAMP      | NO   | CURRENT_TIMESTAMP |             |
| id_usuario   | INTEGER        | NO   | —                 | FK → quien realiza el chequeo |
| id_solicitud | INTEGER        | NO   | —                 | FK. UNIQUE  |

**Foreign Keys:**
- `id_usuario` → `usuario(id_usuario)` — ON DELETE CASCADE
- `id_solicitud` → `solicitud(id_solicitud)` — ON DELETE CASCADE

**Restricción:** `UNIQUE(id_solicitud)` — una solicitud tiene exactamente un chequeo (1:1)

**Relaciones:**
- una `solicitud` tiene como máximo un `chequeo` (1:1)
- un `usuario` realiza muchos `chequeo` (1:N)

---

### Tabla: `item_chequeo`

Detalle del estado de cada ítem dentro de un chequeo.

| Columna         | Tipo PostgreSQL | Nulo | Default | Descripción |
|-----------------|----------------|------|---------|-------------|
| id_item_chequeo | SERIAL         | NO   | —       | PK          |
| estado          | BOOLEAN        | NO   | —       | true = en buen estado, false = con problemas |
| observacion     | TEXT           | SÍ   | NULL    |             |
| id_chequeo      | INTEGER        | NO   | —       | FK          |
| id_item         | INTEGER        | NO   | —       | FK          |

**Foreign Keys:**
- `id_chequeo` → `chequeo(id_chequeo)` — ON DELETE CASCADE
- `id_item` → `item(id_item)` — ON DELETE CASCADE

**Relaciones:**
- un `chequeo` tiene muchos `item_chequeo` (1:N)
- un `item` aparece en muchos `item_chequeo` (1:N)

---

### Tabla: `acta`

Documento formal (PDF) que respalda la entrega de materiales. Cada solicitud tiene como máximo un acta.

| Columna      | Tipo PostgreSQL | Nulo | Default           | Descripción |
|--------------|----------------|------|-------------------|-------------|
| id_acta      | SERIAL         | NO   | —                 | PK          |
| fecha        | TIMESTAMP      | NO   | CURRENT_TIMESTAMP |             |
| url_pdf      | VARCHAR        | SÍ   | NULL              | Ruta del archivo PDF generado |
| id_solicitud | INTEGER        | NO   | —                 | FK. UNIQUE  |
| id_usuario   | INTEGER        | NO   | —                 | FK → quien genera el acta |

**Foreign Keys:**
- `id_solicitud` → `solicitud(id_solicitud)` — ON DELETE CASCADE
- `id_usuario` → `usuario(id_usuario)` — ON DELETE CASCADE

**Restricción:** `UNIQUE(id_solicitud)` — una solicitud tiene exactamente un acta (1:1)

**Relaciones:**
- una `solicitud` tiene como máximo un `acta` (1:1)
- un `usuario` genera muchas `acta` (1:N)

---

## Módulo de Movimientos

---

### Tabla: `tipo_movimiento`

Catálogo de tipos de movimiento de inventario. No tiene dependencias externas.

**Nota:** la tabla `movimiento` que consumía este catálogo fue eliminada del sistema; `tipo_movimiento` se mantiene como catálogo aunque actualmente ninguna tabla lo referencia por FK.

| Columna            | Tipo PostgreSQL | Nulo | Default | Descripción |
|--------------------|----------------|------|---------|-------------|
| id_tipo_movimiento | SERIAL         | NO   | —       | PK          |
| nombre             | VARCHAR(100)   | NO   | —       | UNIQUE. Ej: ENTRADA, SALIDA, TRASLADO |

**Foreign Keys:** ninguna

---

### Tabla: `kardex`

Bitácora contable de movimientos de un ítem con saldos acumulados (entrada/salida con saldo antes y después).

| Columna        | Tipo PostgreSQL | Nulo | Default | Descripción |
|----------------|----------------|------|---------|-------------|
| id_kardex      | SERIAL         | NO   | —       | PK          |
| tipo           | VARCHAR(50)    | NO   | —       | ENTRADA / SALIDA / AJUSTE |
| cantidad       | INTEGER        | NO   | —       | Cantidad del movimiento |
| saldo_anterior | INTEGER        | NO   | —       | Stock antes del movimiento |
| saldo_actual   | INTEGER        | NO   | —       | Stock después del movimiento |
| fecha          | TIMESTAMP      | NO   | —       |             |
| observacion    | TEXT           | SÍ   | NULL    |             |
| id_item        | INTEGER        | NO   | —       | FK          |
| id_usuario     | INTEGER        | NO   | —       | FK → quien registra |

**Foreign Keys:**
- `id_item` → `item(id_item)` — ON DELETE CASCADE
- `id_usuario` → `usuario(id_usuario)` — ON DELETE CASCADE

**Relaciones:**
- un `item` tiene muchos registros en `kardex` (1:N)
- un `usuario` registra muchos `kardex` (1:N)

---

### Tabla: `traslado`

Solicitud de cambio de ubicación de un ítem entre dos sitios. Incluye flujo de aprobación.

| Columna                 | Tipo PostgreSQL | Nulo | Default           | Descripción |
|-------------------------|----------------|------|-------------------|-------------|
| id_traslado             | SERIAL         | NO   | —                 | PK          |
| id_item                 | INTEGER        | NO   | —                 | FK          |
| id_sitio_origen         | INTEGER        | NO   | —                 | FK → sitio de donde sale el ítem |
| id_sitio_destino        | INTEGER        | NO   | —                 | FK → sitio al que llega el ítem |
| id_usuario_solicita     | INTEGER        | NO   | —                 | FK → quien solicita el traslado |
| estado                  | VARCHAR(20)    | NO   | 'PENDIENTE'       | PENDIENTE / APROBADO / RECHAZADO |
| fecha_solicitud         | TIMESTAMP      | NO   | CURRENT_TIMESTAMP | Automático  |
| justificacion           | TEXT           | SÍ   | NULL              |             |
| id_usuario_aprueba      | INTEGER        | SÍ   | NULL              | FK → quien aprueba o rechaza |
| fecha_resolucion        | TIMESTAMP      | SÍ   | NULL              | Fecha de aprobación o rechazo |
| observacion_resolucion  | TEXT           | SÍ   | NULL              |             |

**Foreign Keys:**
- `id_item` → `item(id_item)` — ON DELETE CASCADE
- `id_sitio_origen` → `sitio(id_sitio)` — ON DELETE CASCADE
- `id_sitio_destino` → `sitio(id_sitio)` — ON DELETE CASCADE
- `id_usuario_solicita` → `usuario(id_usuario)` — ON DELETE CASCADE
- `id_usuario_aprueba` → `usuario(id_usuario)` — ON DELETE SET NULL

**Relaciones:**
- un `item` tiene muchos `traslado` (1:N)
- un `sitio` es origen de muchos `traslado` (1:N)
- un `sitio` es destino de muchos `traslado` (1:N)
- un `usuario` solicita muchos `traslado` (1:N)
- un `usuario` aprueba muchos `traslado` (1:N)

---

## Módulo de Seguimiento

---

### Tabla: `notificacion`

Notificación interna enviada a un usuario del sistema.

| Columna         | Tipo PostgreSQL | Nulo | Default           | Descripción |
|-----------------|----------------|------|-------------------|-------------|
| id_notificacion | SERIAL         | NO   | —                 | PK          |
| mensaje         | TEXT           | NO   | —                 |             |
| leida           | BOOLEAN        | NO   | false             |             |
| fecha           | TIMESTAMP      | NO   | CURRENT_TIMESTAMP |             |
| id_usuario      | INTEGER        | NO   | —                 | FK → destinatario |

**Foreign Keys:**
- `id_usuario` → `usuario(id_usuario)` — ON DELETE CASCADE

**Relación:** un `usuario` recibe muchas `notificacion` (1:N)

---

### Tabla: `novedad`

Reporte de incidente o novedad sobre un ítem (daño, pérdida, mantenimiento, etc.).

| Columna     | Tipo PostgreSQL | Nulo | Default           | Descripción |
|-------------|----------------|------|-------------------|-------------|
| id_novedad  | SERIAL         | NO   | —                 | PK          |
| tipo        | VARCHAR(50)    | NO   | —                 | DAÑO / PERDIDA / MANTENIMIENTO / OTRO |
| descripcion | TEXT           | NO   | —                 |             |
| estado      | VARCHAR(20)    | NO   | 'PENDIENTE'       | PENDIENTE / ATENDIDA / CERRADA |
| fecha       | TIMESTAMP      | NO   | CURRENT_TIMESTAMP | Automático  |
| id_item     | INTEGER        | SÍ   | NULL              | FK → ítem afectado |
| id_usuario  | INTEGER        | NO   | —                 | FK → quien reporta |

**Foreign Keys:**
- `id_item` → `item(id_item)` — ON DELETE SET NULL
- `id_usuario` → `usuario(id_usuario)` — ON DELETE CASCADE

**Relaciones:**
- un `item` tiene muchas `novedad` (1:N)
- un `usuario` registra muchas `novedad` (1:N)

---

### Tabla: `prestamo`

Préstamo temporal de un ítem a un usuario con fecha de devolución esperada.

| Columna                   | Tipo PostgreSQL | Nulo | Default           | Descripción |
|---------------------------|----------------|------|-------------------|-------------|
| id_prestamo               | SERIAL         | NO   | —                 | PK          |
| fecha_prestamo            | TIMESTAMP      | NO   | CURRENT_TIMESTAMP | Automático  |
| fecha_devolucion_esperada | TIMESTAMP      | NO   | —                 |             |
| fecha_devolucion_real     | TIMESTAMP      | SÍ   | NULL              | NULL = no devuelto aún |
| estado                    | VARCHAR(20)    | NO   | 'ACTIVO'          | ACTIVO / DEVUELTO / VENCIDO |
| observacion               | TEXT           | SÍ   | NULL              |             |
| id_item                   | INTEGER        | NO   | —                 | FK → ítem prestado |
| id_usuario_solicitante    | INTEGER        | NO   | —                 | FK → quien recibe el préstamo |
| id_usuario_responsable    | INTEGER        | NO   | —                 | FK → quien autoriza el préstamo |

**Foreign Keys:**
- `id_item` → `item(id_item)` — ON DELETE CASCADE
- `id_usuario_solicitante` → `usuario(id_usuario)` — ON DELETE CASCADE
- `id_usuario_responsable` → `usuario(id_usuario)` — ON DELETE CASCADE

**Relaciones:**
- un `item` tiene muchos `prestamo` (1:N)
- un `usuario` solicita muchos `prestamo` (1:N)
- un `usuario` es responsable de muchos `prestamo` (1:N)

---

## Reglas de integridad referencial

| Estrategia | Cuándo se usa en este modelo |
|---|---|
| `ON DELETE CASCADE` | El hijo no tiene sentido sin el padre. Ej: `detalle_solicitud` sin su `solicitud` |
| `ON DELETE SET NULL` | La FK es opcional y el registro hijo puede existir sin referencia. Ej: `sitio.id_responsable` cuando el usuario es eliminado |
| `ON DELETE RESTRICT` | Se protege el registro padre de eliminación accidental. Ej: `ordenes_compra` no debe eliminarse si el ítem se borra |

## Restricciones UNIQUE por tabla

| Tabla | Columna con UNIQUE | Motivo |
|---|---|---|
| `centro` | `nombre`, `codigo` | Unicidad del centro institucional |
| `rol` | `nombre` | No puede haber dos roles con el mismo nombre |
| `permisos` | `nombre` | Clave del permiso única por sistema |
| `usuario` | `correo` | Una cuenta por correo electrónico |
| `categoria` | `nombre` | No duplicar categorías |
| `producto` | `SKU` | Código de producto único |
| `item` | `placa_sena` | Identificador físico único SENA |
| `inventario` | `id_item` | Un ítem = un registro de inventario |
| `programa` | `codigo` | Código de programa único |
| `ficha` | `numero_ficha` | Número de ficha SENA único |
| `devolucion` | `id_solicitud` | Una solicitud = una devolución (1:1) |
| `chequeo` | `id_solicitud` | Una solicitud = un chequeo (1:1) |
| `acta` | `id_solicitud` | Una solicitud = un acta (1:1) |
| `tipo_movimiento` | `nombre` | No duplicar tipos de movimiento |
