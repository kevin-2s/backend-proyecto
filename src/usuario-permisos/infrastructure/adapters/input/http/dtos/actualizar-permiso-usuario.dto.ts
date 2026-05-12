import { IsBoolean, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ActualizarPermisoUsuarioDto {
  @ApiProperty({ example: false, description: 'Estado activo del permiso' })
  @IsBoolean()
  @IsNotEmpty()
  activo: boolean;
}
