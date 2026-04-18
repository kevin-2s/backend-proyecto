import { IsEnum, IsNotEmpty, IsInt } from 'class-validator';
import { EstadoItem } from '../../../../../items/domain/entities/item.domain.entity';

export class CreateInventarioDto {
  @IsEnum(EstadoItem)
  @IsNotEmpty()
  estado: EstadoItem;

  @IsInt()
  @IsNotEmpty()
  id_item: number;

  @IsInt()
  @IsNotEmpty()
  id_sitio: number;
}
