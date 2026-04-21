import { IsString, IsNotEmpty, IsInt } from "class-validator";

export class CreateActaDto {
  @IsString()
  @IsNotEmpty()
  url_pdf: string;

  @IsInt()
  @IsNotEmpty()
  id_solicitud: number;

  @IsInt()
  @IsNotEmpty()
  id_usuario: number;
}
