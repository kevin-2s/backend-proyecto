# Diccionario de Base de Datos — SGM

## Convenciones

| Símbolo | Significado |
|---|---|
| PK | Primary Key — clave primaria |
| FK | Foreign Key — clave foránea |
| UK | Unique — valor único en la tabla |
| NN | Not Null — campo obligatorio |
| AI | Auto Increment — valor generado automáticamente |

---

## MÓDULO 1 — Seguridad y Acceso

### Tabla: `rol`
Almacena los roles del sistema. Define el tipo de usuario y sus permisos base.

| Columna | Tipo PostgreSQL | Nulo | Default | Restricciones | Descripción |
|---|---|---|---|---|---|
| id_rol | SERIAL | NO | AI | PK | Identificador único del rol |
| nombre | VARCHAR(100) | NO | — | UK | Nombre del rol (Administrador, Instructor, Aprendiz, Responsable de Bodega) |

**Relaciones:** Ninguna

---

### Tabla: `usuario`
Usuarios que pueden iniciar sesión en el sistema.

| Columna | Tipo PostgreSQL | Nulo | Default | Restricciones | Descripción |
|---|---|---|---|---|---|
| id_usuario | SERIAL | NO | AI | PK | Identificador único del usuario |
| nombre | VARCHAR(150) | NO | — | NN | Nombre completo |
| correo | VARCHAR(100) | NO | — | NN, UK | Correo electrónico usado para login |
| telefono | VARCHAR(30) | SÍ | NULL | — | Teléfono de contacto |
| documento | VARCHAR(50) | SÍ | NULL | — | Número de documento de identidad |
| password | VARCHAR | NO | — | NN | Contraseña cifrada con bcrypt |
| estado | BOOLEAN | NO | true | NN | true = activo / false = desactivado |
| id_rol | INTEGER | NO | — | NN, FK → rol(id_rol) | Rol asignado al usuario |

**ON DELETE:** id_rol → CASCADE

---

### Tabla: `permisos`
Catálogo de todos los permisos granulares del sistema.

| Columna | Tipo PostgreSQL | Nulo | Default | Restricciones | Descripción |
|---|---|---|---|---|---|
| id_permiso | SERIAL | NO | AI | PK | Identificador único del permiso |
| nombre | VARCHAR(100) | NO | — | NN, UK | Nombre clave del permiso (ej: ver_items) |
| descripcion | TEXT | NO | — | NN | Descripción en lenguaje natural |
| modulo | VARCHAR(100) | NO | — | NN | Módulo al que pertenece |
| activo | BOOLEAN | NO | true | NN | true = permiso habilitado |

**Relaciones:** Ninguna directa

---

### Tabla: `rol_permisos`
Asigna permisos a roles. Un rol puede tener muchos permisos.

| Columna | Tipo PostgreSQL | Nulo | Default | Restricciones | Descripción |
|---|---|---|---|---|---|
| id | SERIAL | NO | AI | PK | Identificador único del registro |
| id_rol | INTEGER | NO | — | NN, FK → rol(id_rol) | Rol al que se asigna el permiso |
| id_permiso | INTEGER | NO | — | NN, FK → permisos(id_permiso) | Permiso asignado al rol |

**ON DELETE:** id_rol → CASCADE, id_permiso → CASCADE

---

### Tabla: `usuario_permisos`
Permisos individuales por usuario. Sobrescriben los del rol (pueden conceder o denegar).

| Columna | Tipo PostgreSQL | Nulo | Default | Restricciones | Descripción |
|---|---|---|---|---|---|
| id | SERIAL | NO | AI | PK | Identificador único del registro |
| id_usuario | INTEGER | NO | — | NN, FK → usuario(id_usuario) | Usuario al que aplica |
| id_permiso | INTEGER | NO | — | NN, FK → permisos(id_permiso) | Permiso individual |
| activo | BOOLEAN | NO | true | NN | true = concedido / false = denegado explícitamente |
| fecha_asignacion | TIMESTAMP | NO | NOW() | NN | Fecha de asignación del permiso |

**ON DELETE:** id_usuario → CASCADE, id_permiso → CASCADE

---

## MÓDULO 2 — Organización

### Tabla: `centro`
Centros de formación SENA. Unidad organizacional principal.

| Columna | Tipo PostgreSQL | Nulo | Default | Restricciones | Descripción |
|---|---|---|---|---|---|
| id_centro | SERIAL | NO | AI | PK | Identificador único del centro |
| nombre | VARCHAR(150) | NO | — | NN, UK | Nombre oficial del centro |
| codigo | VARCHAR(50) | NO | — | NN, UK | Código identificador del centro |
| regional | VARCHAR(100) | NO | — | NN | Regional SENA a la que pertenece |
| estado | BOOLEAN | NO | true | NN | true = centro activo |

**Relaciones:** Ninguna

---

### Tabla: `sede`
Sedes físicas de un centro de formación.

| Columna | Tipo PostgreSQL | Nulo | Default | Restricciones | Descripción |
|---|---|---|---|---|---|
| id_sede | SERIAL | NO | AI | PK | Identificador único de la sede |
| nombre | VARCHAR(150) | NO | — | NN | Nombre de la sede |
| direccion | VARCHAR(250) | NO | — | NN | Dirección física |
| id_centro | INTEGER | NO | — | NN, FK → centro(id_centro) | Centro al que pertenece |
| estado | BOOLEAN | NO | true | NN | true = sede activa |

**ON DELETE:** id_centro → CASCADE

---

### Tabla: `area`
Áreas dentro de una sede (Tecnología, Administrativa, etc.).

| Columna | Tipo PostgreSQL | Nulo | Default | Restricciones | Descripción |
|---|---|---|---|---|---|
| id_area | SERIAL | NO | AI | PK | Identificador único del área |
| nombre | VARCHAR(150) | NO | — | NN, UK | Nombre del área |
| id_sede | INTEGER | SÍ | NULL | FK → sede(id_sede) | Sede a la que pertenece |
| estado | BOOLEAN | NO | true | NN | true = área activa |

**ON DELETE:** id_sede → SET NULL

---

### Tabla: `programa`
Programas de formación ofrecidos dentro de un área.

| Columna | Tipo PostgreSQL | Nulo | Default | Restricciones | Descripción |
|---|---|---|---|---|---|
| id_programa | SERIAL | NO | AI | PK | Identificador único del programa |
| nombre | VARCHAR(150) | NO | — | NN | Nombre del programa |
| codigo | VARCHAR(50) | NO | — | NN, UK | Código oficial del programa |
| id_area | INTEGER | NO | — | NN, FK → area(id_area) | Área a la que pertenece |
| estado | BOOLEAN | NO | true | NN | true = programa activo |

**ON DELETE:** id_area → CASCADE

---

### Tabla: `ficha`
Fichas de aprendizaje (grupos de aprendices) asociadas a un programa.

| Columna | Tipo PostgreSQL | Nulo | Default | Restricciones | Descripción |
|---|---|---|---|---|---|
| id_ficha | SERIAL | NO | AI | PK | Identificador único de la ficha |
| numero_ficha | VARCHAR(50) | NO | — | NN, UK | Número oficial SENA de la ficha |
| id_programa | INTEGER | NO | — | NN, FK → programa(id_programa) | Programa al que pertenece |
| id_responsable | INTEGER | SÍ | NULL | FK → usuario(id_usuario) | Instructor responsable |
| ambiente | VARCHAR(50) | SÍ | NULL | — | Ambiente de formación asignado |
| estado | BOOLEAN | NO | true | NN | true = ficha activa |

**ON DELETE:** id_programa → CASCADE, id_responsable → SET NULL

---

### Tabla: `sitio`
Ubicaciones físicas donde se almacenan o usan los items.

| Columna | Tipo PostgreSQL | Nulo | Default | Restricciones | Descripción |
|---|---|---|---|---|---|
| id_sitio | SERIAL | NO | AI | PK | Identificador único del sitio |
| nombre | VARCHAR(150) | NO | — | NN | Nombre del sitio |
| tipo | VARCHAR(50) | NO | — | NN | Tipo: ALMACEN, AULA, LABORATORIO, OTRO |
| tipo_personalizado | VARCHAR(100) | SÍ | NULL | — | Descripción cuando tipo = OTRO |
| codigo_lugar | VARCHAR(50) | SÍ | NULL | — | Código interno del lugar |
| id_responsable | INTEGER | SÍ | NULL | FK → usuario(id_usuario) | Usuario responsable del sitio |
| id_centro | INTEGER | SÍ | NULL | FK → centro(id_centro) | Centro al que pertenece |
| estado | BOOLEAN | NO | true | NN | true = sitio activo |

**ON DELETE:** id_responsable → SET NULL, id_centro → CASCADE

---

## MÓDULO 3 — Catálogo e Inventario

### Tabla: `categoria`
Categorías para clasificar productos.

| Columna | Tipo PostgreSQL | Nulo | Default | Restricciones | Descripción |
|---|---|---|---|---|---|
| id_categoria | SERIAL | NO | AI | PK | Identificador único de la categoría |
| nombre | VARCHAR(150) | NO | — | NN, UK | Nombre de la categoría |

**Relaciones:** Ninguna

---

### Tabla: `producto`
Catálogo de productos genéricos. Un producto tiene múltiples items físicos.

| Columna | Tipo PostgreSQL | Nulo | Default | Restricciones | Descripción |
|---|---|---|---|---|---|
| id_producto | SERIAL | NO | AI | PK | Identificador único del producto |
| nombre | VARCHAR(150) | NO | — | NN | Nombre del producto |
| descripcion | TEXT | SÍ | NULL | — | Descripción detallada |
| codigo_unspsc | VARCHAR(50) | SÍ | NULL | — | Código UNSPSC de clasificación internacional |
| SKU | VARCHAR(100) | SÍ | NULL | UK | Código SKU único del producto |
| tipo_material | VARCHAR(50) | NO | — | NN | Tipo: consumible, durable, etc. |
| unidad_medida | VARCHAR(50) | NO | — | NN | Unidad: unidad, kg, litro, etc. |
| es_psd | BOOLEAN | NO | false | NN | true = producto sujeto a devolución |
| fecha_vencimiento | DATE | SÍ | NULL | — | Fecha de vencimiento si aplica |
| id_categoria | INTEGER | NO | — | NN, FK → categoria(id_categoria) | Categoría del producto |
| stock_minimo | INTEGER | NO | 0 | NN | Cantidad mínima antes de alerta |
| unidad_peso_bulto | VARCHAR(50) | SÍ | NULL | — | Unidad de peso del bulto |
| peso_por_bulto | DECIMAL(10,2) | SÍ | NULL | — | Peso por bulto |
| id_sitio | INTEGER | SÍ | NULL | FK → sitio(id_sitio) | Sitio de almacenamiento principal |

**ON DELETE:** id_categoria → CASCADE

---

### Tabla: `item`
Unidades físicas individuales de un producto, identificadas por placa SENA.

| Columna | Tipo PostgreSQL | Nulo | Default | Restricciones | Descripción |
|---|---|---|---|---|---|
| id_item | SERIAL | NO | AI | PK | Identificador único del item |
| codigo_sku | VARCHAR(150) | SÍ | NULL | — | Código SKU del item |
| placa_sena | VARCHAR(100) | SÍ | NULL | UK | Placa SENA del item físico |
| estado | VARCHAR(50) | NO | 'DISPONIBLE' | NN | Estado actual del item |
| id_producto | INTEGER | NO | — | NN, FK → producto(id_producto) | Producto al que pertenece |
| id_sitio | INTEGER | SÍ | NULL | FK → sitio(id_sitio) | Sitio donde se ubica actualmente |

**ON DELETE:** id_producto → CASCADE, id_sitio → SET NULL

---

### Tabla: `inventario`
Estado actual de cada item. Relación 1:1 con item.

| Columna | Tipo PostgreSQL | Nulo | Default | Restricciones | Descripción |
|---|---|---|---|---|---|
| id_inventario | SERIAL | NO | AI | PK | Identificador único del registro |
| estado | VARCHAR(50) | NO | — | NN | Estado del item en inventario |
| id_item | INTEGER | NO | — | NN, UK, FK → item(id_item) | Item al que corresponde (1:1) |
| id_sitio | INTEGER | NO | — | NN, FK → sitio(id_sitio) | Sitio donde está registrado |

**ON DELETE:** id_item → CASCADE, id_sitio → CASCADE

---

## MÓDULO 4 — Solicitudes y Operaciones

### Tabla: `solicitud`
Solicitudes de préstamo o asignación de materiales.

| Columna | Tipo PostgreSQL | Nulo | Default | Restricciones | Descripción |
|---|---|---|---|---|---|
| id_solicitud | SERIAL | NO | AI | PK | Identificador único de la solicitud |
| fecha | TIMESTAMP | NO | — | NN | Fecha y hora de creación |
| estado | VARCHAR(50) | NO | 'PENDIENTE' | NN | Estado de la solicitud |
| tipo | VARCHAR(50) | NO | — | NN | Tipo: PRESTAMO, ASIGNACION, etc. |
| observacion | TEXT | SÍ | NULL | — | Observaciones del solicitante |
| id_usuario | INTEGER | NO | — | NN, FK → usuario(id_usuario) | Usuario que realizó la solicitud |
| id_usuario_aprueba | INTEGER | SÍ | NULL | FK → usuario(id_usuario) | Usuario que aprobó o rechazó |
| id_ficha | INTEGER | SÍ | NULL | FK → ficha(id_ficha) | Ficha asociada |
| id_producto | INTEGER | SÍ | NULL | FK → producto(id_producto) | Producto solicitado |
| cantidad | INTEGER | NO | 1 | NN | Cantidad solicitada |

**ON DELETE:** id_usuario → CASCADE, id_usuario_aprueba → SET NULL, id_ficha → CASCADE, id_producto → SET NULL

---

### Tabla: `detalle_solicitud`
Productos incluidos en cada solicitud (una solicitud puede tener varios productos).

| Columna | Tipo PostgreSQL | Nulo | Default | Restricciones | Descripción |
|---|---|---|---|---|---|
| id_detalle | SERIAL | NO | AI | PK | Identificador único del detalle |
| cantidad | INTEGER | NO | — | NN | Cantidad del producto en este detalle |
| id_solicitud | INTEGER | NO | — | NN, FK → solicitud(id_solicitud) | Solicitud a la que pertenece |
| id_producto | INTEGER | NO | — | NN, FK → producto(id_producto) | Producto solicitado |

**ON DELETE:** id_solicitud → CASCADE, id_producto → CASCADE

---

### Tabla: `prestamo`
Préstamos activos de items a usuarios.

| Columna | Tipo PostgreSQL | Nulo | Default | Restricciones | Descripción |
|---|---|---|---|---|---|
| id_prestamo | SERIAL | NO | AI | PK | Identificador único del préstamo |
| fecha_prestamo | TIMESTAMP | NO | NOW() | NN | Fecha en que se realizó el préstamo |
| fecha_devolucion_esperada | TIMESTAMP | NO | — | NN | Fecha acordada para devolver el item |
| fecha_devolucion_real | TIMESTAMP | SÍ | NULL | — | Fecha real de devolución |
| estado | VARCHAR(20) | NO | 'ACTIVO' | NN | Estado: ACTIVO, DEVUELTO, VENCIDO |
| observacion | TEXT | SÍ | NULL | — | Observaciones del préstamo |
| id_item | INTEGER | NO | — | NN, FK → item(id_item) | Item prestado |
| id_usuario_solicitante | INTEGER | NO | — | NN, FK → usuario(id_usuario) | Usuario que recibe el préstamo |
| id_usuario_responsable | INTEGER | NO | — | NN, FK → usuario(id_usuario) | Usuario que autorizó el préstamo |

**ON DELETE:** id_item → CASCADE, id_usuario_solicitante → CASCADE, id_usuario_responsable → CASCADE

---

### Tabla: `devolucion`
Registro de devoluciones de items prestados.

| Columna | Tipo PostgreSQL | Nulo | Default | Restricciones | Descripción |
|---|---|---|---|---|---|
| id_devolucion | SERIAL | NO | AI | PK | Identificador único de la devolución |
| fecha | TIMESTAMP | NO | NOW() | NN | Fecha de la devolución |
| estado | VARCHAR(50) | NO | — | NN | Condición: BUENO, REGULAR, DAÑADO, PERDIDO |
| observacion | TEXT | SÍ | NULL | — | Observaciones sobre el estado |
| id_solicitud | INTEGER | NO | — | NN, UK, FK → solicitud(id_solicitud) | Solicitud que originó la devolución (1:1) |
| id_item | INTEGER | NO | — | NN, FK → item(id_item) | Item devuelto |

**ON DELETE:** id_solicitud → CASCADE, id_item → CASCADE

---

### Tabla: `asignacion`
Asignaciones permanentes de productos a fichas de aprendizaje.

| Columna | Tipo PostgreSQL | Nulo | Default | Restricciones | Descripción |
|---|---|---|---|---|---|
| id_asignacion | SERIAL | NO | AI | PK | Identificador único de la asignación |
| id_ficha | INTEGER | NO | — | NN, FK → ficha(id_ficha) | Ficha que recibe los materiales |
| id_producto | INTEGER | NO | — | NN, FK → producto(id_producto) | Producto asignado |
| cantidad | INTEGER | NO | — | NN | Cantidad de unidades asignadas |
| fecha_asignacion | TIMESTAMP | NO | NOW() | NN | Fecha de la asignación |
| id_usuario_asigna | INTEGER | NO | — | NN, FK → usuario(id_usuario) | Usuario que realizó la asignación |
| observacion | TEXT | SÍ | NULL | — | Observaciones de la asignación |
| estado | VARCHAR(20) | NO | 'ACTIVA' | NN | Estado: ACTIVA, FINALIZADA |

**ON DELETE:** id_ficha → CASCADE, id_producto → CASCADE, id_usuario_asigna → CASCADE

---

### Tabla: `asignacion_item`
Vincula items físicos específicos a una asignación.

| Columna | Tipo PostgreSQL | Nulo | Default | Restricciones | Descripción |
|---|---|---|---|---|---|
| id_asignacion_item | SERIAL | NO | AI | PK | Identificador único del registro |
| id_asignacion | INTEGER | NO | — | NN, FK → asignacion(id_asignacion) | Asignación a la que pertenece |
| id_item | INTEGER | NO | — | NN, FK → item(id_item) | Item físico asignado |

**ON DELETE:** id_asignacion → CASCADE, id_item → CASCADE

---

### Tabla: `traslado`
Solicitudes de traslado de un item entre sitios.

| Columna | Tipo PostgreSQL | Nulo | Default | Restricciones | Descripción |
|---|---|---|---|---|---|
| id_traslado | SERIAL | NO | AI | PK | Identificador único del traslado |
| id_item | INTEGER | NO | — | NN, FK → item(id_item) | Item que se traslada |
| id_sitio_origen | INTEGER | NO | — | NN, FK → sitio(id_sitio) | Sitio desde donde sale el item |
| id_sitio_destino | INTEGER | NO | — | NN, FK → sitio(id_sitio) | Sitio hacia donde va el item |
| id_usuario_solicita | INTEGER | NO | — | NN, FK → usuario(id_usuario) | Usuario que solicita el traslado |
| estado | VARCHAR(20) | NO | 'PENDIENTE' | NN | Estado: PENDIENTE, APROBADO, RECHAZADO |
| fecha_solicitud | TIMESTAMP | NO | NOW() | NN | Fecha de la solicitud |
| justificacion | TEXT | SÍ | NULL | — | Razón del traslado |
| id_usuario_aprueba | INTEGER | SÍ | NULL | FK → usuario(id_usuario) | Usuario que resolvió el traslado |
| fecha_resolucion | TIMESTAMP | SÍ | NULL | — | Fecha de aprobación o rechazo |
| observacion_resolucion | TEXT | SÍ | NULL | — | Observación al momento de resolver |

**ON DELETE:** id_item → CASCADE, id_sitio_origen → CASCADE, id_sitio_destino → CASCADE, id_usuario_solicita → CASCADE, id_usuario_aprueba → SET NULL

---

### Tabla: `novedad`
Novedades sobre el estado de un item (daños, pérdidas, mantenimiento).

| Columna | Tipo PostgreSQL | Nulo | Default | Restricciones | Descripción |
|---|---|---|---|---|---|
| id_novedad | SERIAL | NO | AI | PK | Identificador único de la novedad |
| tipo | VARCHAR(50) | NO | — | NN | Tipo: DAÑO, PERDIDA, MANTENIMIENTO, OTRO |
| descripcion | TEXT | NO | — | NN | Descripción detallada de la novedad |
| estado | VARCHAR(20) | NO | 'PENDIENTE' | NN | Estado: PENDIENTE, RESUELTA |
| fecha | TIMESTAMP | NO | NOW() | NN | Fecha del reporte |
| id_item | INTEGER | SÍ | NULL | FK → item(id_item) | Item al que se refiere |
| id_usuario | INTEGER | NO | — | NN, FK → usuario(id_usuario) | Usuario que reportó |

**ON DELETE:** id_item → SET NULL, id_usuario → CASCADE

---

## MÓDULO 5 — Trazabilidad

### Tabla: `tipo_movimiento`
Catálogo de tipos de movimiento posibles.

| Columna | Tipo PostgreSQL | Nulo | Default | Restricciones | Descripción |
|---|---|---|---|---|---|
| id_tipo_movimiento | SERIAL | NO | AI | PK | Identificador único del tipo |
| nombre | VARCHAR(100) | NO | — | NN, UK | Nombre: ENTRADA, SALIDA, TRASLADO, etc. |

**Relaciones:** Ninguna

---

### Tabla: `kardex`
Historial cronológico de entradas y salidas de cada item con saldos.

| Columna | Tipo PostgreSQL | Nulo | Default | Restricciones | Descripción |
|---|---|---|---|---|---|
| id_kardex | SERIAL | NO | AI | PK | Identificador único del registro |
| tipo | VARCHAR(50) | NO | — | NN | Tipo del movimiento: ENTRADA, SALIDA |
| cantidad | INTEGER | NO | — | NN | Cantidad que entró o salió |
| saldo_anterior | INTEGER | NO | — | NN | Saldo antes del movimiento |
| saldo_actual | INTEGER | NO | — | NN | Saldo después del movimiento |
| fecha | TIMESTAMP | NO | — | NN | Fecha y hora del registro |
| observacion | TEXT | SÍ | NULL | — | Observaciones del registro |
| id_item | INTEGER | NO | — | NN, FK → item(id_item) | Item al que corresponde |
| id_usuario | INTEGER | NO | — | NN, FK → usuario(id_usuario) | Usuario que generó el movimiento |

**ON DELETE:** id_item → CASCADE, id_usuario → CASCADE

---

### Tabla: `chequeo`
Chequeos periódicos de verificación de inventario.

| Columna | Tipo PostgreSQL | Nulo | Default | Restricciones | Descripción |
|---|---|---|---|---|---|
| id_chequeo | SERIAL | NO | AI | PK | Identificador único del chequeo |
| fecha | TIMESTAMP | NO | NOW() | NN | Fecha en que se realizó |
| id_usuario | INTEGER | NO | — | NN, FK → usuario(id_usuario) | Usuario que realizó el chequeo |
| id_solicitud | INTEGER | NO | — | NN, UK, FK → solicitud(id_solicitud) | Solicitud asociada (1:1) |

**ON DELETE:** id_usuario → CASCADE, id_solicitud → CASCADE

---

### Tabla: `item_chequeo`
Items verificados dentro de un chequeo de inventario.

| Columna | Tipo PostgreSQL | Nulo | Default | Restricciones | Descripción |
|---|---|---|---|---|---|
| id_item_chequeo | SERIAL | NO | AI | PK | Identificador único del registro |
| estado | BOOLEAN | NO | — | NN | true = item OK / false = con novedad |
| observacion | TEXT | SÍ | NULL | — | Observación sobre el item verificado |
| id_chequeo | INTEGER | NO | — | NN, FK → chequeo(id_chequeo) | Chequeo al que pertenece |
| id_item | INTEGER | NO | — | NN, FK → item(id_item) | Item verificado |

**ON DELETE:** id_chequeo → CASCADE, id_item → CASCADE

---

### Tabla: `acta`
Actas generadas al cierre de un proceso o solicitud.

| Columna | Tipo PostgreSQL | Nulo | Default | Restricciones | Descripción |
|---|---|---|---|---|---|
| id_acta | SERIAL | NO | AI | PK | Identificador único del acta |
| fecha | TIMESTAMP | NO | NOW() | NN | Fecha de generación |
| url_pdf | VARCHAR | SÍ | NULL | — | Ruta o URL del archivo PDF generado |
| id_solicitud | INTEGER | NO | — | NN, UK, FK → solicitud(id_solicitud) | Solicitud a la que corresponde (1:1) |
| id_usuario | INTEGER | NO | — | NN, FK → usuario(id_usuario) | Usuario que generó el acta |

**ON DELETE:** id_solicitud → CASCADE, id_usuario → CASCADE

---

## MÓDULO 6 — Notificaciones

### Tabla: `notificacion`
Notificaciones internas enviadas a usuarios del sistema.

| Columna | Tipo PostgreSQL | Nulo | Default | Restricciones | Descripción |
|---|---|---|---|---|---|
| id_notificacion | SERIAL | NO | AI | PK | Identificador único de la notificación |
| mensaje | TEXT | NO | — | NN | Contenido del mensaje |
| leida | BOOLEAN | NO | false | NN | false = no leída / true = leída |
| fecha | TIMESTAMP | NO | NOW() | NN | Fecha de generación |
| id_usuario | INTEGER | NO | — | NN, FK → usuario(id_usuario) | Usuario destinatario |

**ON DELETE:** id_usuario → CASCADE

---

## SECCIÓN A — Ejemplos de Datos Reales

Un registro de ejemplo por tabla con datos realistas del contexto SENA.

| Tabla | Ejemplo de registro |
|---|---|
| rol | id_rol=1, nombre='Administrador' |
| usuario | id_usuario=1, nombre='Carlos Jiménez', correo='carlos.jimenez@sena.edu.co', telefono='3001234567', documento='1020304050', estado=true, id_rol=1 |
| permisos | id_permiso=1, nombre='ver_items', descripcion='Permite ver los items del inventario', modulo='items', activo=true |
| rol_permisos | id=1, id_rol=1, id_permiso=1 |
| usuario_permisos | id=1, id_usuario=3, id_permiso=5, activo=false, fecha_asignacion='2024-03-15 10:00:00' |
| centro | id_centro=1, nombre='Centro de Gestión de Mercados', codigo='CGMLTI', regional='Regional Bogotá', estado=true |
| sede | id_sede=1, nombre='Sede Principal', direccion='Calle 52 #13-65, Bogotá', id_centro=1, estado=true |
| area | id_area=1, nombre='Área de Tecnología de la Información', id_sede=1, estado=true |
| programa | id_programa=1, nombre='Análisis y Desarrollo de Software', codigo='228185', id_area=1, estado=true |
| ficha | id_ficha=1, numero_ficha='2758369', id_programa=1, id_responsable=2, ambiente='Ambiente 201', estado=true |
| sitio | id_sitio=1, nombre='Almacén Principal TI', tipo='ALMACEN', codigo_lugar='ALM-001', id_responsable=1, id_centro=1, estado=true |
| categoria | id_categoria=1, nombre='Equipos de Cómputo' |
| producto | id_producto=1, nombre='Portátil HP ProBook 440', SKU='HP-PB440-G9', tipo_material='durable', unidad_medida='unidad', es_psd=true, id_categoria=1, stock_minimo=5 |
| item | id_item=1, placa_sena='SENA-2024-001', estado='DISPONIBLE', id_producto=1, id_sitio=1 |
| inventario | id_inventario=1, estado='DISPONIBLE', id_item=1, id_sitio=1 |
| solicitud | id_solicitud=1, fecha='2024-03-20 09:30:00', estado='PENDIENTE', tipo='PRESTAMO', id_usuario=3, cantidad=2 |
| detalle_solicitud | id_detalle=1, cantidad=2, id_solicitud=1, id_producto=1 |
| prestamo | id_prestamo=1, fecha_prestamo='2024-03-21 08:00:00', fecha_devolucion_esperada='2024-04-21 08:00:00', estado='ACTIVO', id_item=1, id_usuario_solicitante=3, id_usuario_responsable=1 |
| devolucion | id_devolucion=1, fecha='2024-04-20 10:00:00', estado='BUENO', id_solicitud=1, id_item=1 |
| asignacion | id_asignacion=1, id_ficha=1, id_producto=1, cantidad=10, fecha_asignacion='2024-01-15 08:00:00', id_usuario_asigna=1, estado='ACTIVA' |
| asignacion_item | id_asignacion_item=1, id_asignacion=1, id_item=1 |
| traslado | id_traslado=1, id_item=2, id_sitio_origen=1, id_sitio_destino=2, id_usuario_solicita=2, estado='PENDIENTE', fecha_solicitud='2024-03-22 11:00:00', justificacion='Reubicación para mantenimiento' |
| novedad | id_novedad=1, tipo='DAÑO', descripcion='Pantalla con grieta visible en esquina superior', estado='PENDIENTE', fecha='2024-03-25 14:00:00', id_item=3, id_usuario=2 |
| tipo_movimiento | id_tipo_movimiento=1, nombre='ENTRADA' |
| kardex | id_kardex=1, tipo='ENTRADA', cantidad=1, saldo_anterior=0, saldo_actual=1, fecha='2024-01-10 08:00:00', id_item=1, id_usuario=1 |
| chequeo | id_chequeo=1, fecha='2024-03-01 09:00:00', id_usuario=1, id_solicitud=5 |
| item_chequeo | id_item_chequeo=1, estado=true, observacion=NULL, id_chequeo=1, id_item=1 |
| acta | id_acta=1, fecha='2024-03-21 10:00:00', url_pdf='/reportes/acta-001.pdf', id_solicitud=1, id_usuario=1 |
| notificacion | id_notificacion=1, mensaje='Su solicitud #1 ha sido aprobada', leida=false, fecha='2024-03-21 08:05:00', id_usuario=3 |

---

## SECCIÓN B — Índices de la Base de Datos

Los índices aceleran las consultas. PostgreSQL crea automáticamente índices para PK y UNIQUE.

### Índices automáticos (PK — creados por SERIAL)
Todas las tablas tienen índice automático en su columna `id_*`.

### Índices UNIQUE (creados por `unique: true` en las entidades)

| Tabla | Columna indexada | Propósito |
|---|---|---|
| rol | nombre | Evita roles duplicados |
| usuario | correo | Evita correos duplicados (usado en login) |
| permisos | nombre | Evita permisos duplicados |
| centro | nombre, codigo | Identifica centros sin ambigüedad |
| area | nombre | Evita áreas duplicadas |
| programa | codigo | Código único por programa |
| ficha | numero_ficha | Número de ficha único en el sistema |
| categoria | nombre | Evita categorías duplicadas |
| producto | SKU | Código de producto único |
| item | placa_sena | Placa SENA única por item |
| inventario | id_item | Garantiza relación 1:1 con item |
| devolucion | id_solicitud | Garantiza 1 devolución por solicitud |
| chequeo | id_solicitud | Garantiza 1 chequeo por solicitud |
| acta | id_solicitud | Garantiza 1 acta por solicitud |
| tipo_movimiento | nombre | Evita tipos de movimiento duplicados |

### Índices recomendados adicionales (para rendimiento en consultas frecuentes)

| Tabla | Columna | Razón |
|---|---|---|
| solicitud | estado | Se filtra frecuentemente por estado PENDIENTE |
| solicitud | id_usuario | Se consulta "mis solicitudes" con frecuencia |
| item | estado | Se filtra por DISPONIBLE constantemente |
| item | id_producto | Se buscan items de un producto con frecuencia |
| notificacion | id_usuario, leida | Se consultan notificaciones no leídas por usuario |
| kardex | id_item | Se consulta el historial de un item con frecuencia |
| traslado | estado | Se filtran traslados PENDIENTES frecuentemente |

---

## SECCIÓN C — Reglas de Negocio

Restricciones que no están en la estructura de la tabla sino en el código de la aplicación.

### Reglas de Items
| # | Regla | Dónde se aplica |
|---|---|---|
| RN-01 | Un item con estado `DADO_DE_BAJA` no puede ser prestado, asignado ni trasladado | ItemsService |
| RN-02 | La `placa_sena` debe ser única en toda la tabla item | UNIQUE en BD |
| RN-03 | Al crear un item, su estado inicial siempre es `DISPONIBLE` | Default en BD |
| RN-04 | Cuando se presta un item, su estado cambia a `PRESTADO` automáticamente | PrestamosService |
| RN-05 | Cuando se devuelve un item, su estado vuelve a `DISPONIBLE` automáticamente | DevolucionesService |

### Reglas de Solicitudes
| # | Regla | Dónde se aplica |
|---|---|---|
| RN-06 | Una solicitud solo puede aprobarse o rechazarse si su estado es `PENDIENTE` | SolicitudesService |
| RN-07 | Una solicitud solo puede entregarse si su estado es `APROBADA` | SolicitudesService |
| RN-08 | Solo el usuario con permiso `aprobar_solicitudes` puede cambiar el estado a APROBADA o RECHAZADA | PermisosGuard |
| RN-23 | Un usuario no puede aprobar/rechazar una solicitud que él mismo creó (`id_usuario_aprueba !== solicitud.id_usuario`), sin importar su rol | SolicitudesService → `AutoAprobacionSolicitudForbiddenException` (403) |
| RN-24 | Si el sitio del producto solicitado tiene un `Responsable de Bodega` asignado (`sitio.id_responsable`), solo ese usuario puede aprobar/rechazar la solicitud. El Administrador solo puede hacerlo si el sitio no tiene responsable asignado, o si él mismo es el responsable | SolicitudesService → `SoloResponsablePuedeAprobarSolicitudForbiddenException` (403) |

### Reglas de Traslados
| # | Regla | Dónde se aplica |
|---|---|---|
| RN-09 | El `id_sitio_origen` debe coincidir con el sitio actual del item al momento de solicitar el traslado | TrasladosService |
| RN-10 | Un traslado solo puede aprobarse o rechazarse si su estado es `PENDIENTE` | TrasladosService |
| RN-11 | Al aprobar un traslado, el `id_sitio` del item se actualiza automáticamente al `id_sitio_destino` | TrasladosService |
| RN-25 | Un usuario no puede aprobar/rechazar un traslado que él mismo solicitó (`id_usuario_aprueba !== traslado.id_usuario_solicita`) | TrasladosService → `AutoAprobacionTrasladoForbiddenException` (403) |
| RN-26 | Si el sitio de origen del traslado tiene un `Responsable de Bodega` asignado, solo ese usuario puede aprobar/rechazar. El Administrador solo puede hacerlo si el sitio de origen no tiene responsable, o si él mismo lo es | TrasladosService → `SoloResponsablePuedeAprobarTrasladoForbiddenException` (403) |

### Reglas de Permisos (ReBAC)
| # | Regla | Dónde se aplica |
|---|---|---|
| RN-12 | El rol `Administrador` tiene todos los permisos por defecto sin necesidad de asignación | PermisosGuard |
| RN-13 | Un registro en `usuario_permisos` con `activo=false` deniega el permiso aunque el rol lo tenga | PermisosGuard |
| RN-14 | Un registro en `usuario_permisos` con `activo=true` concede el permiso aunque el rol no lo tenga | PermisosGuard |
| RN-15 | El Instructor tiene permisos `ver_*` por defecto sin necesitar registro en `usuario_permisos` | PermisosGuard (fallback) |

### Reglas de Unicidad de Documentos
| # | Regla | Dónde se aplica |
|---|---|---|
| RN-16 | Solo puede existir 1 devolución por solicitud | UNIQUE en devolucion.id_solicitud |
| RN-17 | Solo puede existir 1 chequeo por solicitud | UNIQUE en chequeo.id_solicitud |
| RN-18 | Solo puede existir 1 acta por solicitud | UNIQUE en acta.id_solicitud |
| RN-19 | Solo puede existir 1 registro de inventario por item | UNIQUE en inventario.id_item |

### Reglas de Autenticación
| # | Regla | Dónde se aplica |
|---|---|---|
| RN-20 | Un usuario con `estado=false` no puede iniciar sesión aunque las credenciales sean correctas | AuthService |
| RN-21 | La contraseña siempre se almacena cifrada con bcrypt (nunca en texto plano) | AuthService |
| RN-22 | El `correo` del usuario es único y se usa como identificador de login | UNIQUE en usuario.correo |

---

## Resumen Final

| Elemento | Cantidad |
|---|---|
| Tablas totales | 29 |
| Columnas totales | 188 |
| Relaciones FK | 55 |
| Índices UNIQUE | 15 |
| Índices adicionales recomendados | 7 |
| Reglas de negocio documentadas | 26 |

### Tablas por módulo

| Módulo | Tablas |
|---|---|
| Seguridad y Acceso | rol, usuario, permisos, rol_permisos, usuario_permisos |
| Organización | centro, sede, area, programa, ficha, sitio |
| Catálogo e Inventario | categoria, producto, item, inventario |
| Solicitudes y Operaciones | solicitud, detalle_solicitud, prestamo, devolucion, asignacion, asignacion_item, traslado, novedad |
| Trazabilidad | tipo_movimiento, kardex, chequeo, item_chequeo, acta |
| Notificaciones | notificacion |

**Nota:** `ordenes_compra` y `movimiento` fueron eliminados del sistema (código, entidades y tabla). El módulo `tipos-movimiento` se mantiene como catálogo, aunque ya no tiene ninguna tabla que lo consuma como FK.
