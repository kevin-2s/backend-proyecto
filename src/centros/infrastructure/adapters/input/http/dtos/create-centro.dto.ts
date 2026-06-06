import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateCentroDto {
  @ApiProperty({ example: 'Centro de Formación Agroindustrial', description: 'Nombre del centro de formación SENA' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: true, description: 'Estado activo/inactivo del centro', required: false, default: true })
  @IsBoolean()
  @IsOptional()
  estado?: boolean;
}
