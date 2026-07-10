import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, Min, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAsignacionDto {
  @ApiProperty({ example: 1, description: 'ID de la ficha a la que se asigna el producto' })
  @IsInt()
  @IsNotEmpty()
  id_ficha: number;

  @ApiProperty({ example: 3, description: 'ID del producto a asignar' })
  @IsInt()
  @IsNotEmpty()
  id_producto: number;

  @ApiProperty({ example: 5, description: 'Cantidad de unidades a asignar' })
  @IsInt()
  @Min(1)
  cantidad: number;

  @ApiProperty({ example: 2, description: 'ID del usuario que realiza la asignación' })
  @IsInt()
  @IsNotEmpty()
  id_usuario_asigna: number;

  @ApiProperty({ example: 'Para prácticas del periodo 2026-1', required: false })
  @IsOptional()
  @IsString()
  observacion?: string;

  @ApiProperty({ example: [5, 7], description: 'IDs específicos de ítems a asignar (omite el descuento automático de stock)', required: false })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  id_items?: number[];

  @ApiProperty({ example: '2025-12-31', description: 'Fecha de devolución (solo para material devolutivo)', required: false })
  @IsDateString()
  @IsOptional()
  fecha_devolucion?: string;
}
