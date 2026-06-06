import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, IsOptional, IsBoolean } from 'class-validator';

export class CreateAreaDto {
  @ApiProperty({ example: 'Sistemas', description: 'Nombre del área' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 1, description: 'ID de la sede (sitio)' })
  @IsInt()
  @IsNotEmpty()
  id_sitio: number;

  @ApiProperty({ example: true, description: 'Estado activo/inactivo del área', required: false, default: true })
  @IsBoolean()
  @IsOptional()
  estado?: boolean;
}
