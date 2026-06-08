import { IsString, IsOptional, IsIn } from 'class-validator';

export class RegistrarDevolucionDto {
  @IsString()
  @IsIn(['BUENO', 'REGULAR', 'DAÑADO', 'PERDIDO'])
  estado_devolucion: string;

  @IsOptional()
  @IsString()
  observacion_devolucion?: string;
}
