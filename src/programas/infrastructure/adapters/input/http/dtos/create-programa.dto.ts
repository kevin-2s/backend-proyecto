import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateProgramaDto {
  @ApiProperty({ example: 'Análisis y Desarrollo de Software', description: 'Nombre del programa de formación' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: '228118', description: 'Código del programa de formación' })
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @ApiProperty({ example: 1, description: 'ID del área a la que pertenece' })
  @IsNumber()
  @IsNotEmpty()
  id_area: number;

  @ApiProperty({ example: true, description: 'Estado activo/inactivo', required: false, default: true })
  @IsBoolean()
  @IsOptional()
  estado?: boolean;
}
