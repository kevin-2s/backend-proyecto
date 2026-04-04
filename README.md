# SGM Backend (Sistema de Gestión de Materiales)

Este es el backend para el **Sistema de Gestión de Materiales (SGM)**, desarrollado utilizando el framework [NestJS](https://nestjs.com/) y siguiendo principios de **Arquitectura Hexagonal (Ports & Adapters)**.

## 📋 Requisitos Previos

Asegúrate de tener instalados los siguientes programas en tu máquina local antes de continuar:

- [Node.js](https://nodejs.org/es/) (Versión 16+ recomendada)
- [npm](https://www.npmjs.com/) (Administrador de paquetes de Node)
- [Redis](https://redis.io/) (Necesario para el manejo de colas y procesos asíncronos con BullMQ)
- [TypeScript](https://www.typescriptlang.org/) / [@nestjs/cli](https://docs.nestjs.com/cli/overview) (Recomendado para compilar y servir de manera local)

## 🚀 Instalación y Configuración

Sigue estos pasos para instalar y configurar el proyecto de forma correcta:

1. **Clonar e ingresar al proyecto:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd backend-proyecto
   ```

2. **Instalar dependencias:**
   Ejecuta el siguiente comando para instalar todos los paquetes necesarios definidos en el `package.json`.
   ```bash
   npm install
   ```

   *(Nota: Asegúrate de instalar TypeScript y el CLI de Nest de forma global si experimentas incovenientes para correr el proyecto)*
   ```bash
   npm install -g @nestjs/cli typescript ts-node
   ```

3. **Configurar las variables de entorno:**
   Crea un archivo `.env` en la raíz de tu proyecto (junto al `package.json`). Puedes ver un ejemplo de cómo estructurarlo a continuación:

   ```env
   # Configuración de Servidor
   PORT=3000

   # Configuración para Autenticación (JWT)
   JWT_SECRET=tu_escribe_tu_secreto_aqui
   JWT_EXPIRATION=1d

   # Configuración de Redis (Obligatorio para BullMQ)
   REDIS_HOST=127.0.0.1
   REDIS_PORT=6379
   ```

## 💻 Ejecución del Proyecto

### Modo Desarrollo

Para correr el proyecto mientras estás programando (con recarga automática de cambios):

```bash
# Si tienes el CLI de Nest instalado:
nest start --watch

# Si necesitas usar ts-node de manera directa con tu main.ts:
npx ts-node src/main.ts
```

### Modo Producción

Para compilar el proyecto TypeScript a JavaScript y lanzar el servidor para producción:

```bash
# 1. Compilar el proyecto
nest build
# (O alternativamente: npx tsc)

# 2. Ejecutar la versión compilada
node dist/main.js
```

## 📦 Estructura del Aplicativo

El sistema sigue una estructura modular orientada al dominio del negocio. Algunos módulos importantes son:
- `auth`: Autenticación y Autorización basada en Roles.
- `users`, `roles`: Gestión de usuarios del sistema y políticas de acceso.
- `productos`, `categoria`: Control de los materiales e insumos.
- `inventario`, `movimientos`: Registros y métricas de entrada y salidas.
- (Entre otros módulos de gestión y reportes del SGM)

## 🛠 Tecnologías Principales Empleadas

- **NestJS**: Framework nativo para la estructura orientada a módulos.
- **BullMQ / ioredis**: Para gestión y procesamiento de colas.
- **Passport y JWT**: Manejo robusto de la seguridad y autenticación.
- **Arquitectura Hexagonal (Clean Architecture)**: Lógica de negocio separada de las implementaciones de infraestructura.
