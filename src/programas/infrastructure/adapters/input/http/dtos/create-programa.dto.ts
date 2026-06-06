import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, IsOptional, IsBoolean } from 'class-validator';

export class CreateProgramaDto {
  @ApiProperty({ example: '228106', description: 'Código del programa de formación' })
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @ApiProperty({ example: 'Análisis y Desarrollo de Software', description: 'Nombre del programa de formación' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 1, description: 'ID del área a la que pertenece' })
  @IsInt()
  @IsNotEmpty()
  id_area: number;

  @ApiProperty({ example: true, description: 'Estado activo/inactivo del programa', required: false, default: true })
  @IsBoolean()
  @IsOptional()
  estado?: boolean;
}
