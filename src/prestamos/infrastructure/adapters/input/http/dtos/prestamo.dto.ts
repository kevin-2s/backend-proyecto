import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class CreatePrestamoDto {
  @IsDateString()
  fecha_devolucion_esperada: string;

  @IsOptional()
  @IsString()
  observacion?: string;

  @IsInt()
  id_item: number;

  @IsInt()
  id_usuario_solicitante: number;

  @IsInt()
  id_usuario_responsable: number;
}

export class DevolucionDto {
  @IsOptional()
  @IsString()
  observacion?: string;
}
