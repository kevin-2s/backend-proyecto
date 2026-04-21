import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateItemChequeoDto {
  @ApiProperty({ example: true, description: "Estado del item encontrado" })
  @IsBoolean()
  @IsNotEmpty()
  estado: boolean;

  @ApiProperty({
    example: "Item en buen estado",
    description: "Observación del estado del item",
    required: false,
  })
  @IsString()
  @IsOptional()
  observacion?: string;

  @ApiProperty({ example: 1, description: "ID del chequeo asociado" })
  @IsInt()
  @IsNotEmpty()
  id_chequeo: number;

  @ApiProperty({ example: 1, description: "ID del item chequeado" })
  @IsInt()
  @IsNotEmpty()
  id_item: number;
}
