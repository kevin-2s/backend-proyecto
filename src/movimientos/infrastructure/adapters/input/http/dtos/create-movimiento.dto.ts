import { IsDateString, IsString, IsOptional, IsInt, IsNotEmpty } from 'class-validator';

export class CreateMovimientoDto {
  @IsDateString()
  @IsNotEmpty()
  fecha: Date;

  @IsString()
  @IsOptional()
  observacion?: string;

  @IsInt()
  @IsNotEmpty()
  id_item: number;

  @IsInt()
  @IsNotEmpty()
  id_tipo_movimiento: number;

  @IsInt()
  @IsNotEmpty()
  id_usuario: number;
}
