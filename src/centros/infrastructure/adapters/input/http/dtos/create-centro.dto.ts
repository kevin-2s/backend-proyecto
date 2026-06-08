import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateCentroDto {
  @ApiProperty({ example: 'Centro de Electricidad, Electrónica y Telecomunicaciones', description: 'Nombre del centro de formación' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: '9201', description: 'Código único del centro' })
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @ApiProperty({ example: 'Distrito Capital', description: 'Regional a la que pertenece el centro' })
  @IsString()
  @IsNotEmpty()
  regional: string;

  @ApiProperty({ example: true, description: 'Estado activo/inactivo', required: false, default: true })
  @IsBoolean()
  @IsOptional()
  estado?: boolean;
}
