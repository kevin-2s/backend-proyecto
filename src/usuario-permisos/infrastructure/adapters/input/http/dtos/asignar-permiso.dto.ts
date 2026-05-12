import { IsNumber, IsBoolean, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AsignarPermisoDto {
  @ApiProperty({ example: 1, description: 'ID del permiso' })
  @IsNumber()
  @IsNotEmpty()
  id_permiso: number;

  @ApiProperty({ example: true, description: 'Estado activo del permiso' })
  @IsBoolean()
  @IsNotEmpty()
  activo: boolean;
}
