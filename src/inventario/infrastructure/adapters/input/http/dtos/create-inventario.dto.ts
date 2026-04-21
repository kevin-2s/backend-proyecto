import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsInt } from "class-validator";
import { EstadoItem } from "../../../../../../items/domain/entities/item.domain.entity";

export class CreateInventarioDto {
  @ApiProperty({
    example: EstadoItem.DISPONIBLE,
    enum: EstadoItem,
    description: "Estado actual del item en inventario",
  })
  @IsEnum(EstadoItem)
  @IsNotEmpty()
  estado: EstadoItem;

  @ApiProperty({ example: 1, description: "ID del item especifico" })
  @IsInt()
  @IsNotEmpty()
  id_item: number;

  @ApiProperty({ example: 2, description: "ID del sitio donde se encuentra" })
  @IsInt()
  @IsNotEmpty()
  id_sitio: number;
}
