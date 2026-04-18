import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateDevolucionDto {
  @IsInt()
  @IsNotEmpty()
  id_solicitud: number;

  @IsInt()
  @IsNotEmpty()
  id_usuario_recibe: number;
}
