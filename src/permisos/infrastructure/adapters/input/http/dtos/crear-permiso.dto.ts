import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CrearPermisoDto {
  @ApiProperty({ example: 'ver_inventario', description: 'Nombre único del permiso' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 'Permite ver el inventario', description: 'Descripción detallada' })
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @ApiProperty({ example: 'inventario', description: 'Módulo al que pertenece' })
  @IsString()
  @IsNotEmpty()
  modulo: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
