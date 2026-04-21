import { ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { EstadoDevolucion } from "../../../../../domain/entities/devolucion.domain.entity";

export class CreateDevolucionDto {
  @ApiProperty({
    example: 1,
    description: "ID de la solicitud a la que pertenece la devolución",
  })
  @IsInt()
  @IsNotEmpty()
  id_solicitud: number;

  @ApiProperty({ example: 1, description: "ID del item devuelto" })
  @IsInt()
  @IsNotEmpty()
  id_item: number;

  @ApiProperty({
    example: EstadoDevolucion.BUENO,
    enum: EstadoDevolucion,
    description: "Estado del item devuelto",
  })
  @IsEnum(EstadoDevolucion)
  @IsNotEmpty()
  estado: EstadoDevolucion;

  @ApiProperty({
    example: "Item en buen estado",
    description: "Observación de la devolución",
    required: false,
  })
  @IsString()
  @IsOptional()
  observacion?: string;
}
