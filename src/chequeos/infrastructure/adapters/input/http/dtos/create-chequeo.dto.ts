import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class CreateChequeoDto {
  @ApiProperty({
    example: 1,
    description: "ID del usuario que realiza el chequeo",
  })
  @IsInt()
  @IsNotEmpty()
  id_usuario: number;

  @ApiProperty({ example: 1, description: "ID de la solicitud asociada" })
  @IsInt()
  @IsNotEmpty()
  id_solicitud: number;
}
