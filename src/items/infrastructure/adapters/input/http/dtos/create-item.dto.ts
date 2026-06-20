import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsInt } from "class-validator";
import { EstadoItem } from "../../../../../domain/entities/item.domain.entity";

export class CreateItemDto {
  @ApiProperty({
    example: 'DISPONIBLE',
    description: "Estado del item",
  })
  @IsString()
  @IsNotEmpty()
  estado: EstadoItem;

  @ApiProperty({ example: 1, description: "ID del producto" })
  @IsInt()
  @IsNotEmpty()
  id_producto: number;

  @ApiPropertyOptional({ example: "SENA-12345", description: "Placa SENA del ítem (opcional, única por ítem)" })
  @IsString()
  @IsOptional()
  placa_sena?: string;
}
