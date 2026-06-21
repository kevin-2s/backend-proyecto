import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class AgregarItemAsignacionDto {
  @ApiProperty({ example: 12, description: 'ID del ítem (debe estar DISPONIBLE y pertenecer al mismo producto de la asignación)' })
  @IsInt()
  @IsNotEmpty()
  id_item: number;
}
