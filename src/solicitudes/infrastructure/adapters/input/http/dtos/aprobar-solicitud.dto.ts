import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class AprobarSolicitudDto {
  @ApiProperty({ example: 1, description: 'ID del usuario que aprueba' })
  @IsInt()
  @IsNotEmpty()
  id_usuario_aprueba: number;
}
