import { IsInt, IsString, IsOptional, IsPositive, IsDateString } from 'class-validator';

export class CreatePrestamoDto {
  @IsInt()
  @IsPositive()
  id_item: number;

  @IsInt()
  @IsPositive()
  id_usuario: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  id_ficha?: number;

  @IsDateString()
  fecha_devolucion_esperada: string;

  @IsOptional()
  @IsString()
  observacion?: string;
}
