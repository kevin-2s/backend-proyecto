import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEnum, IsInt } from "class-validator";
import { EstadoItem } from "../../../../../domain/entities/item.domain.entity";

export class CreateItemDto {
  @ApiProperty({
    example: "MAR-001-A",
    description: "Código único de SKU de la instancia",
  })
  @IsString()
  @IsNotEmpty()
  codigo_sku: string;

  @ApiProperty({
    example: EstadoItem.DISPONIBLE,
    enum: EstadoItem,
    description: "Estado del item",
  })
  @IsEnum(EstadoItem)
  @IsNotEmpty()
  estado: EstadoItem;

  @ApiProperty({ example: 1, description: "ID del producto" })
  @IsInt()
  @IsNotEmpty()
  id_producto: number;
}
