import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateNotificacionDto {
  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsString()
  @IsNotEmpty()
  mensaje: string;

  @IsInt()
  @IsNotEmpty()
  id_usuario: number;
}
