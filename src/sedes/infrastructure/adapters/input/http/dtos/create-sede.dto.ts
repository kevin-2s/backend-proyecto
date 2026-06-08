import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, IsOptional, IsBoolean } from 'class-validator';

export class CreateSedeDto {
  @ApiProperty({ example: 'Sede Principal', description: 'Nombre de la sede' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 'Calle 57 No. 8 - 69', description: 'Dirección física de la sede' })
  @IsString()
  @IsNotEmpty()
  direccion: string;

  @ApiProperty({ example: 1, description: 'ID del Centro de Formación asociado' })
  @IsInt()
  @IsNotEmpty()
  id_centro: number;

  @ApiProperty({ example: true, description: 'Estado activo/inactivo', required: false, default: true })
  @IsBoolean()
  @IsOptional()
  estado?: boolean;
}
