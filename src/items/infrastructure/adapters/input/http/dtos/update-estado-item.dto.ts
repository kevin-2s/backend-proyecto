import { IsString, IsNotEmpty } from 'class-validator';
import { EstadoItem } from '../../../../../domain/entities/item.domain.entity';

export class UpdateEstadoItemDto {
  @IsString()
  @IsNotEmpty()
  estado: EstadoItem;
}
