import { IsString, IsNotEmpty, IsEnum, IsInt } from 'class-validator';
import { EstadoItem } from '../../../../../domain/entities/item.domain.entity';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  codigo_sku: string;

  @IsEnum(EstadoItem)
  @IsNotEmpty()
  estado: EstadoItem;

  @IsInt()
  @IsNotEmpty()
  id_producto: number;
}
