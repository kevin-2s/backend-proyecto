import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateChequeoDto {
  @IsString()
  @IsNotEmpty()
  observacion: string;

  @IsInt()
  @IsNotEmpty()
  id_usuario: number;
}
