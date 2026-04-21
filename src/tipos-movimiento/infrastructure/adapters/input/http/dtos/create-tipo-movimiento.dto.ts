import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTipoMovimientoDto {
  @ApiProperty({ example: 'ENTRADA', description: 'Nombre o clasificación del movimiento' })
  @IsString()
  @IsNotEmpty()
  nombre: string;
}
