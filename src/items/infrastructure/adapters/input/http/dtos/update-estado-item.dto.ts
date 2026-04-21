import { IsEnum, IsNotEmpty } from 'class-validator';
import { EstadoItem } from '../../../../../domain/entities/item.domain.entity';

export class UpdateEstadoItemDto {
  @IsEnum(EstadoItem)
  @IsNotEmpty()
  estado: EstadoItem;
}
