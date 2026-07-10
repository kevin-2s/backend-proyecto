-- =====================================================================
-- SEED DE DATOS DE DEMOSTRACIÓN — LogiMat / SGM
-- =====================================================================
-- Cómo usarlo: abre psql conectado a tu base de datos (sgm_db) y pega
-- todo este archivo en la consola.
--
-- IMPORTANTE:
--   1. Este script asume que ya corriste `npm run seed` (o el seed.ts)
--      al menos una vez, para que existan los roles (Administrador,
--      Instructor, Aprendiz, Responsable de Bodega, Super Administrador)
--      y los permisos. Si no lo has hecho, corre eso primero.
--   2. Está pensado para ejecutarse UNA sola vez sobre una base de datos
--      sin estos datos de ejemplo todavía. Si lo corres dos veces vas a
--      obtener errores de duplicado (correo, SKU, placa_sena, etc.) —
--      eso es intencional, para no crear datos repetidos por accidente.
--   3. Las contraseñas de los usuarios de ejemplo son "PrimerNombre123"
--      (ej. el usuario Carlos tiene la contraseña "Carlos123"). Los hashes
--      de abajo ya están cifrados con bcrypt (10 rondas), igual que hace
--      el backend — cópialos tal cual, no son texto plano.
--
-- Todo el script corre dentro de una sola transacción: si algo falla a
-- mitad de camino, no queda la base de datos a medias.
-- =====================================================================

BEGIN;

-- ---------------------------------------------------------------------
-- 1. ESTRUCTURA ORGANIZACIONAL: centro, sede, area, programa, ficha
-- ---------------------------------------------------------------------

INSERT INTO centro (nombre, codigo, regional, estado)
VALUES ('Centro de Gestión y Desarrollo Sostenible Surcolombiano', 'CGDSS', 'Regional Huila', true)
ON CONFLICT (codigo) DO NOTHING;

-- id_administrador se deja en NULL por ahora; se completa más abajo
-- cuando ya exista el usuario administrador (evita el ciclo sede->usuario->ficha).
INSERT INTO sede (nombre, direccion, id_centro, id_administrador, estado)
SELECT 'Sede Yamboró', 'Vereda Yamboró, Pitalito, Huila', c.id_centro, NULL, true
FROM centro c
WHERE c.codigo = 'CGDSS';

INSERT INTO area (nombre, id_sede, estado)
SELECT 'TIC', s.id_sede, true FROM sede s WHERE s.nombre = 'Sede Yamboró';

INSERT INTO area (nombre, id_sede, estado)
SELECT 'PAE', s.id_sede, true FROM sede s WHERE s.nombre = 'Sede Yamboró';

INSERT INTO programa (nombre, codigo, id_area, estado)
SELECT 'Análisis y Desarrollo de Software', '228106', a.id_area, true
FROM area a WHERE a.nombre = 'TIC'
ON CONFLICT (codigo) DO NOTHING;

INSERT INTO programa (nombre, codigo, id_area, estado)
SELECT 'Cocina', '226109', a.id_area, true
FROM area a WHERE a.nombre = 'PAE'
ON CONFLICT (codigo) DO NOTHING;

-- id_responsable se deja en NULL por ahora, se completa más abajo.
INSERT INTO ficha (numero_ficha, id_programa, id_responsable, ambiente, estado)
SELECT '2758369', p.id_programa, NULL, 'Ambiente 201', true
FROM programa p WHERE p.codigo = '228106'
ON CONFLICT (numero_ficha) DO NOTHING;

INSERT INTO ficha (numero_ficha, id_programa, id_responsable, ambiente, estado)
SELECT '2769874', p.id_programa, NULL, 'Ambiente 203', true
FROM programa p WHERE p.codigo = '228106'
ON CONFLICT (numero_ficha) DO NOTHING;

INSERT INTO ficha (numero_ficha, id_programa, id_responsable, ambiente, estado)
SELECT '2781122', p.id_programa, NULL, 'Cocina 1', true
FROM programa p WHERE p.codigo = '226109'
ON CONFLICT (numero_ficha) DO NOTHING;

-- ---------------------------------------------------------------------
-- 2. USUARIOS (contraseña = PrimerNombre + 123, ya cifrada con bcrypt)
-- ---------------------------------------------------------------------

-- Carlos123
INSERT INTO usuario (nombre, correo, telefono, documento, password, estado, id_rol, id_ficha)
SELECT 'Carlos Andrés Jiménez', 'carlos.jimenez@sena.edu.co', '3001234567', '1020304050',
       '$2b$10$rVrLBGf/tKs1ggkiI0vKPeX2cJxkEOZ81IwwEz7Aakray1.CpT9ei', true, r.id_rol, NULL
FROM rol r WHERE r.nombre = 'Administrador'
ON CONFLICT (correo) DO NOTHING;

-- Diego123
INSERT INTO usuario (nombre, correo, telefono, documento, password, estado, id_rol, id_ficha)
SELECT 'Diego Fernando Calderón', 'diego.calderon@sena.edu.co', '3002345678', '1030405060',
       '$2b$10$VhySNuNanQjmdliBBG4vRO41PTu/8DKg80gEslvgHwgLFDPS9li5e', true, r.id_rol, NULL
FROM rol r WHERE r.nombre = 'Responsable de Bodega'
ON CONFLICT (correo) DO NOTHING;

-- Maria123
INSERT INTO usuario (nombre, correo, telefono, documento, password, estado, id_rol, id_ficha)
SELECT 'María Fernanda López', 'maria.lopez@sena.edu.co', '3003456789', '1040506070',
       '$2b$10$HaatW0ToWsaO2pnYl7Wg9.3WUhmeY4EzE6728T4oiJWN9OXoJY7d2', true, r.id_rol, NULL
FROM rol r WHERE r.nombre = 'Instructor'
ON CONFLICT (correo) DO NOTHING;

-- Andres123
INSERT INTO usuario (nombre, correo, telefono, documento, password, estado, id_rol, id_ficha)
SELECT 'Andrés Felipe Torres', 'andres.torres@sena.edu.co', '3004567890', '1050607080',
       '$2b$10$x3mVDdK9A4se73cjPqDgzud2ZG9pTJcDQqVMhtO0RAABVmVxFm1fy', true, r.id_rol, NULL
FROM rol r WHERE r.nombre = 'Instructor'
ON CONFLICT (correo) DO NOTHING;

-- Juan123 (aprendiz, ficha ADSO 2758369)
INSERT INTO usuario (nombre, correo, telefono, documento, password, estado, id_rol, id_ficha)
SELECT 'Juan Pablo Rodríguez', 'juan.rodriguez@sena.edu.co', '3005678901', '1060708090',
       '$2b$10$1ZcK/x5ou0n35XGWW1Sile9xFXgQlV3kNwS2WytCF8aMIQt7dSMv6', true, r.id_rol, f.id_ficha
FROM rol r, ficha f
WHERE r.nombre = 'Aprendiz' AND f.numero_ficha = '2758369'
ON CONFLICT (correo) DO NOTHING;

-- Valentina123 (aprendiz, ficha Cocina 2781122)
INSERT INTO usuario (nombre, correo, telefono, documento, password, estado, id_rol, id_ficha)
SELECT 'Valentina Gómez Ruiz', 'valentina.gomez@sena.edu.co', '3006789012', '1070809010',
       '$2b$10$MctOikmF4PU04CjbGrtNdu6fBQk0Ft222EwK85cyochCnhRuSY2.y', true, r.id_rol, f.id_ficha
FROM rol r, ficha f
WHERE r.nombre = 'Aprendiz' AND f.numero_ficha = '2781122'
ON CONFLICT (correo) DO NOTHING;

-- Completar los responsables que dejamos en NULL más arriba.
UPDATE sede SET id_administrador = (SELECT id_usuario FROM usuario WHERE correo = 'carlos.jimenez@sena.edu.co')
WHERE nombre = 'Sede Yamboró';

UPDATE ficha SET id_responsable = (SELECT id_usuario FROM usuario WHERE correo = 'maria.lopez@sena.edu.co')
WHERE numero_ficha IN ('2758369', '2769874');

UPDATE ficha SET id_responsable = (SELECT id_usuario FROM usuario WHERE correo = 'andres.torres@sena.edu.co')
WHERE numero_ficha = '2781122';

-- ---------------------------------------------------------------------
-- 3. SITIOS (bodegas / ambientes), CATEGORÍAS y PRODUCTOS
-- ---------------------------------------------------------------------

INSERT INTO sitio (nombre, tipo, codigo_lugar, id_responsable, id_centro, estado)
SELECT 'Bodega Principal TIC', 'BODEGA', 'ALM-001', u.id_usuario, c.id_centro, true
FROM usuario u, centro c
WHERE u.correo = 'diego.calderon@sena.edu.co' AND c.codigo = 'CGDSS';

INSERT INTO sitio (nombre, tipo, codigo_lugar, id_responsable, id_centro, estado)
SELECT 'Ambiente 201', 'AMBIENTE', '201', u.id_usuario, c.id_centro, true
FROM usuario u, centro c
WHERE u.correo = 'maria.lopez@sena.edu.co' AND c.codigo = 'CGDSS';

INSERT INTO sitio (nombre, tipo, codigo_lugar, id_responsable, id_centro, estado)
SELECT 'Bodega Cocina', 'BODEGA', 'ALM-002', u.id_usuario, c.id_centro, true
FROM usuario u, centro c
WHERE u.correo = 'andres.torres@sena.edu.co' AND c.codigo = 'CGDSS';

INSERT INTO categoria (nombre) VALUES ('Equipos de Cómputo') ON CONFLICT (tenant_id, nombre) DO NOTHING;
INSERT INTO categoria (nombre) VALUES ('Insumos de Cocina') ON CONFLICT (tenant_id, nombre) DO NOTHING;
INSERT INTO categoria (nombre) VALUES ('Papelería y Oficina') ON CONFLICT (tenant_id, nombre) DO NOTHING;

INSERT INTO producto (nombre, descripcion, "SKU", tipo_material, unidad_medida, es_psd, id_categoria, stock_minimo, id_sitio)
SELECT 'Portátil HP ProBook 440', 'Portátil para uso en ambientes de formación TIC', 'HP-PB440-G9',
       'DEVOLUTIVO', 'UNIDAD', true, cat.id_categoria, 2, s.id_sitio
FROM categoria cat, sitio s
WHERE cat.nombre = 'Equipos de Cómputo' AND s.nombre = 'Bodega Principal TIC'
ON CONFLICT (tenant_id, "SKU") DO NOTHING;

INSERT INTO producto (nombre, descripcion, "SKU", tipo_material, unidad_medida, es_psd, id_categoria, stock_minimo, id_sitio)
SELECT 'Mouse Inalámbrico Logitech', 'Mouse óptico inalámbrico', 'LOG-M185',
       'DEVOLUTIVO', 'UNIDAD', false, cat.id_categoria, 5, s.id_sitio
FROM categoria cat, sitio s
WHERE cat.nombre = 'Equipos de Cómputo' AND s.nombre = 'Bodega Principal TIC'
ON CONFLICT (tenant_id, "SKU") DO NOTHING;

INSERT INTO producto (nombre, descripcion, "SKU", tipo_material, unidad_medida, es_psd, id_categoria, stock_minimo, id_sitio)
SELECT 'Resma de Papel Carta', 'Papel bond carta 75g', 'PAP-001',
       'CONSUMO', 'PAQUETE', false, cat.id_categoria, 10, s.id_sitio
FROM categoria cat, sitio s
WHERE cat.nombre = 'Papelería y Oficina' AND s.nombre = 'Bodega Principal TIC'
ON CONFLICT (tenant_id, "SKU") DO NOTHING;

INSERT INTO producto (nombre, descripcion, "SKU", tipo_material, unidad_medida, es_psd, id_categoria, stock_minimo, id_sitio)
SELECT 'Arroz Blanco 1kg', 'Arroz blanco de grano largo', 'ARR-001',
       'CONSUMO', 'KILOGRAMO', false, cat.id_categoria, 20, s.id_sitio
FROM categoria cat, sitio s
WHERE cat.nombre = 'Insumos de Cocina' AND s.nombre = 'Bodega Cocina'
ON CONFLICT (tenant_id, "SKU") DO NOTHING;

INSERT INTO producto (nombre, descripcion, "SKU", tipo_material, unidad_medida, es_psd, id_categoria, stock_minimo, id_sitio)
SELECT 'Aceite Vegetal 1L', 'Aceite vegetal comestible', 'ACE-001',
       'CONSUMO', 'UNIDAD', false, cat.id_categoria, 15, s.id_sitio
FROM categoria cat, sitio s
WHERE cat.nombre = 'Insumos de Cocina' AND s.nombre = 'Bodega Cocina'
ON CONFLICT (tenant_id, "SKU") DO NOTHING;

-- ---------------------------------------------------------------------
-- 4. ÍTEMS + INVENTARIO (generados automáticamente por producto)
-- ---------------------------------------------------------------------
-- En vez de escribir a mano cada ítem, este bloque genera N unidades por
-- producto (con placa SENA única PS-2024-XXX) y su registro de inventario.

DO $$
DECLARE
  v_producto RECORD;
  v_item_id INT;
  v_contador INT := 1;
  v_cantidad INT;
  i INT;
BEGIN
  FOR v_producto IN SELECT id_producto, id_sitio, "SKU" FROM producto ORDER BY id_producto LOOP
    v_cantidad := CASE v_producto."SKU"
      WHEN 'HP-PB440-G9' THEN 3
      WHEN 'LOG-M185'    THEN 3
      WHEN 'PAP-001'     THEN 5
      WHEN 'ARR-001'     THEN 7
      WHEN 'ACE-001'     THEN 6
      ELSE 1
    END;

    FOR i IN 1..v_cantidad LOOP
      INSERT INTO item (placa_sena, estado, id_producto, id_sitio)
      VALUES ('PS-2024-' || lpad(v_contador::text, 3, '0'), 'DISPONIBLE', v_producto.id_producto, v_producto.id_sitio)
      RETURNING id_item INTO v_item_id;

      INSERT INTO inventario (estado, id_item, id_sitio)
      VALUES ('DISPONIBLE', v_item_id, v_producto.id_sitio);

      v_contador := v_contador + 1;
    END LOOP;
  END LOOP;
END $$;

-- ---------------------------------------------------------------------
-- 5. SOLICITUDES (cubriendo los 4 estados posibles)
-- ---------------------------------------------------------------------

-- 5.1 Juan solicita un mouse — PENDIENTE (sin resolver todavía)
INSERT INTO solicitud (fecha, estado, tipo, observacion, id_usuario, id_usuario_aprueba, id_ficha, id_producto, cantidad)
SELECT now() - interval '2 days', 'PENDIENTE', 'PRESTAMO', 'Lo necesito para el proyecto de aula',
       u.id_usuario, NULL, u.id_ficha, p.id_producto, 1
FROM usuario u, producto p
WHERE u.correo = 'juan.rodriguez@sena.edu.co' AND p."SKU" = 'LOG-M185';

-- 5.2 Valentina solicita aceite — APROBADA por Andrés (responsable de Bodega Cocina)
INSERT INTO solicitud (fecha, estado, tipo, observacion, id_usuario, id_usuario_aprueba, id_ficha, id_producto, cantidad)
SELECT now() - interval '5 days', 'APROBADA', 'PRESTAMO', 'Práctica de cocina de la semana',
       u.id_usuario, a.id_usuario, u.id_ficha, p.id_producto, 2
FROM usuario u, usuario a, producto p
WHERE u.correo = 'valentina.gomez@sena.edu.co' AND a.correo = 'andres.torres@sena.edu.co' AND p."SKU" = 'ACE-001';

-- 5.3 Juan solicita un portátil — RECHAZADA por Diego (responsable de Bodega TIC)
INSERT INTO solicitud (fecha, estado, tipo, observacion, id_usuario, id_usuario_aprueba, id_ficha, id_producto, cantidad)
SELECT now() - interval '6 days', 'RECHAZADA', 'PRESTAMO', 'Para terminar un ejercicio pendiente',
       u.id_usuario, a.id_usuario, u.id_ficha, p.id_producto, 1
FROM usuario u, usuario a, producto p
WHERE u.correo = 'juan.rodriguez@sena.edu.co' AND a.correo = 'diego.calderon@sena.edu.co' AND p."SKU" = 'HP-PB440-G9';

-- 5.4 Valentina solicita un portátil — ENTREGADA (aprobada y entregada por Diego)
--     Esta es la que vamos a usar más abajo para chequeo/acta/devolución.
INSERT INTO solicitud (fecha, estado, tipo, observacion, id_usuario, id_usuario_aprueba, id_ficha, id_producto, cantidad)
SELECT now() - interval '10 days', 'ENTREGADA', 'PRESTAMO', 'Necesito editar un video de la práctica de cocina',
       u.id_usuario, a.id_usuario, u.id_ficha, p.id_producto, 1
FROM usuario u, usuario a, producto p
WHERE u.correo = 'valentina.gomez@sena.edu.co' AND a.correo = 'diego.calderon@sena.edu.co' AND p."SKU" = 'HP-PB440-G9';

-- ---------------------------------------------------------------------
-- 6. TRASLADOS (muestra la regla de "solo el responsable del sitio de
--    origen puede aprobar", incluso si el administrador lo solicitó)
-- ---------------------------------------------------------------------

-- 6.1 Traslado pendiente: Juan pide mover un mouse de la Bodega TIC al Ambiente 201
INSERT INTO traslado (id_item, id_sitio_origen, id_sitio_destino, id_usuario_solicita, estado, justificacion)
SELECT it.id_item, so.id_sitio, sd.id_sitio, u.id_usuario, 'PENDIENTE', 'Se necesita en el ambiente para la clase'
FROM item it
JOIN sitio so ON so.id_sitio = it.id_sitio AND so.nombre = 'Bodega Principal TIC'
JOIN sitio sd ON sd.nombre = 'Ambiente 201'
JOIN usuario u ON u.correo = 'juan.rodriguez@sena.edu.co'
WHERE it.placa_sena = 'PS-2024-004'; -- primer mouse

-- 6.2 Traslado ya aprobado: Carlos (Administrador) lo SOLICITÓ, pero quien
--     aprueba es Diego porque es el responsable de la bodega de origen —
--     el administrador NO puede aprobar sus propias solicitudes de traslado
--     ni las de una bodega que no le corresponde.
INSERT INTO traslado (id_item, id_sitio_origen, id_sitio_destino, id_usuario_solicita, estado, justificacion, id_usuario_aprueba, fecha_resolucion)
SELECT it.id_item, so.id_sitio, sd.id_sitio, u.id_usuario, 'APROBADO', 'Reubicación para mantenimiento preventivo',
       a.id_usuario, now() - interval '1 day'
FROM item it
JOIN sitio so ON so.id_sitio = it.id_sitio AND so.nombre = 'Bodega Principal TIC'
JOIN sitio sd ON sd.nombre = 'Ambiente 201'
JOIN usuario u ON u.correo = 'carlos.jimenez@sena.edu.co'
JOIN usuario a ON a.correo = 'diego.calderon@sena.edu.co'
WHERE it.placa_sena = 'PS-2024-005'; -- segundo mouse

-- Como el traslado 6.2 quedó APROBADO, el ítem ya vive en el nuevo sitio.
UPDATE item SET id_sitio = (SELECT id_sitio FROM sitio WHERE nombre = 'Ambiente 201')
WHERE placa_sena = 'PS-2024-005';

-- ---------------------------------------------------------------------
-- 7. ASIGNACIÓN directa de productos a una ficha (sin pasar por solicitud)
-- ---------------------------------------------------------------------

INSERT INTO asignacion (id_ficha, id_producto, cantidad, id_usuario_asigna, observacion, estado)
SELECT f.id_ficha, p.id_producto, 5, u.id_usuario, 'Dotación inicial de papelería para la ficha', 'ACTIVA'
FROM ficha f, producto p, usuario u
WHERE f.numero_ficha = '2758369' AND p."SKU" = 'PAP-001' AND u.correo = 'carlos.jimenez@sena.edu.co';

INSERT INTO asignacion_item (id_asignacion, id_item)
SELECT a.id_asignacion, it.id_item
FROM asignacion a
JOIN producto p ON p.id_producto = a.id_producto AND p."SKU" = 'PAP-001'
JOIN item it ON it.id_producto = p.id_producto
WHERE a.observacion = 'Dotación inicial de papelería para la ficha';

-- ---------------------------------------------------------------------
-- 8. CHEQUEO + ACTA + DEVOLUCIÓN sobre la solicitud ENTREGADA (5.4)
-- ---------------------------------------------------------------------

INSERT INTO chequeo (id_usuario, id_solicitud)
SELECT a.id_usuario, s.id_solicitud
FROM usuario a, solicitud s
WHERE a.correo = 'diego.calderon@sena.edu.co'
  AND s.observacion = 'Necesito editar un video de la práctica de cocina';

INSERT INTO item_chequeo (estado, observacion, id_chequeo, id_item)
SELECT true, 'Portátil recibido en buen estado, sin daños visibles', c.id_chequeo, it.id_item
FROM chequeo c
JOIN solicitud s ON s.id_solicitud = c.id_solicitud AND s.observacion = 'Necesito editar un video de la práctica de cocina'
JOIN item it ON it.placa_sena = 'PS-2024-001';

INSERT INTO acta (url_pdf, id_solicitud, id_usuario)
SELECT '/reportes/actas/acta-demo-001.pdf', s.id_solicitud, a.id_usuario
FROM solicitud s, usuario a
WHERE s.observacion = 'Necesito editar un video de la práctica de cocina'
  AND a.correo = 'diego.calderon@sena.edu.co';

INSERT INTO devolucion (estado, observacion, id_solicitud, id_item)
SELECT 'BUENO', 'Devuelto sin novedad al finalizar la práctica', s.id_solicitud, it.id_item
FROM solicitud s, item it
WHERE s.observacion = 'Necesito editar un video de la práctica de cocina'
  AND it.placa_sena = 'PS-2024-001';

-- ---------------------------------------------------------------------
-- 9. NOVEDADES
-- ---------------------------------------------------------------------

INSERT INTO novedad (tipo, descripcion, estado, id_item, id_usuario)
SELECT 'DAÑO', 'La pantalla presenta una línea vertical intermitente', 'PENDIENTE', it.id_item, u.id_usuario
FROM item it, usuario u
WHERE it.placa_sena = 'PS-2024-002' AND u.correo = 'diego.calderon@sena.edu.co';

INSERT INTO novedad (tipo, descripcion, estado, id_item, id_usuario)
SELECT 'MANTENIMIENTO', 'Limpieza y cambio de pasta térmica programado', 'RESUELTA', it.id_item, u.id_usuario
FROM item it, usuario u
WHERE it.placa_sena = 'PS-2024-003' AND u.correo = 'diego.calderon@sena.edu.co';

-- ---------------------------------------------------------------------
-- 10. NOTIFICACIONES
-- ---------------------------------------------------------------------

INSERT INTO notificacion (mensaje, leida, id_usuario)
SELECT 'Nueva solicitud de préstamo: 1 unidad de "Mouse Inalámbrico Logitech". Requiere tu aprobación.', false, u.id_usuario
FROM usuario u WHERE u.correo = 'diego.calderon@sena.edu.co';

INSERT INTO notificacion (mensaje, leida, id_usuario)
SELECT 'Tu solicitud de préstamo fue aprobada.', true, u.id_usuario
FROM usuario u WHERE u.correo = 'valentina.gomez@sena.edu.co';

INSERT INTO notificacion (mensaje, leida, id_usuario)
SELECT 'Tu solicitud de préstamo fue rechazada.', false, u.id_usuario
FROM usuario u WHERE u.correo = 'juan.rodriguez@sena.edu.co';

INSERT INTO notificacion (mensaje, leida, id_usuario)
SELECT 'Solicitud de traslado pendiente: "Mouse Inalámbrico Logitech" quiere trasladarse a "Ambiente 201". Requiere tu aprobación.', false, u.id_usuario
FROM usuario u WHERE u.correo = 'diego.calderon@sena.edu.co';

-- ---------------------------------------------------------------------
-- 11. KARDEX (historial de entradas/salidas del portátil de la solicitud 5.4)
-- ---------------------------------------------------------------------

INSERT INTO kardex (tipo, cantidad, saldo_anterior, saldo_actual, fecha, observacion, id_item, id_usuario)
SELECT 'ENTRADA', 1, 0, 1, now() - interval '30 days', 'Ingreso inicial al inventario', it.id_item, u.id_usuario
FROM item it, usuario u
WHERE it.placa_sena = 'PS-2024-001' AND u.correo = 'carlos.jimenez@sena.edu.co';

INSERT INTO kardex (tipo, cantidad, saldo_anterior, saldo_actual, fecha, observacion, id_item, id_usuario)
SELECT 'SALIDA', 1, 1, 0, now() - interval '10 days', 'Entrega por préstamo aprobado', it.id_item, u.id_usuario
FROM item it, usuario u
WHERE it.placa_sena = 'PS-2024-001' AND u.correo = 'diego.calderon@sena.edu.co';

COMMIT;

-- =====================================================================
-- Resumen de usuarios creados (correo / contraseña / rol):
--   carlos.jimenez@sena.edu.co    / Carlos123     / Administrador
--   diego.calderon@sena.edu.co    / Diego123      / Responsable de Bodega
--   maria.lopez@sena.edu.co       / Maria123      / Instructor
--   andres.torres@sena.edu.co     / Andres123     / Instructor
--   juan.rodriguez@sena.edu.co    / Juan123       / Aprendiz
--   valentina.gomez@sena.edu.co   / Valentina123  / Aprendiz
-- =====================================================================
