# --- STAGE 1: Build stage ---
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias completas para compilar
RUN npm ci

# Copiar el código fuente y archivos de configuración
COPY . .

# Compilar la aplicación NestJS
RUN npm run build

# Eliminar node_modules de desarrollo e instalar solo producción
RUN npm prune --production


# --- STAGE 2: Production runner ---
FROM node:20-alpine AS runner

WORKDIR /usr/src/app

ENV NODE_ENV=production

# Copiar dependencias de producción y binario de producción
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

# Puerto expuesto por el backend por defecto (coincide con PORT)
EXPOSE 3001

CMD ["node", "dist/main.js"]
