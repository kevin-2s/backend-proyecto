import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString, IsOptional, IsInt, IsNotEmpty } from 'class-validator';

export class CreateMovimientoDto {
  @ApiProperty({ example: '2026-04-19T00:00:00.000Z', description: 'Fecha del movimiento' })
  @IsDateString()
  @IsNotEmpty()
  fecha: Date;

  @ApiProperty({ example: 'Ingreso inicial por compra', description: 'Observación del movimiento', required: false })
  @IsString()
  @IsOptional()
  observacion?: string;

  @ApiProperty({ example: 1, description: 'ID del item movido' })
  @IsInt()
  @IsNotEmpty()
  id_item: number;

  @ApiProperty({ example: 1, description: 'ID del tipo de movimiento' })
  @IsInt()
  @IsNotEmpty()
  id_tipo_movimiento: number;

  @ApiProperty({ example: 1, description: 'ID del usuario que realiza el movimiento' })
  @IsInt()
  @IsNotEmpty()
  id_usuario: number;

  @ApiProperty({ example: 10, description: 'Cantidad del movimiento' })
  @IsInt()
  @IsNotEmpty()
  cantidad: number;
}
