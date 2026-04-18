import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { EstadoEncontrado } from '../../../../../domain/entities/item-chequeo.domain.entity';

export class CreateItemChequeoDto {
  @IsEnum(EstadoEncontrado)
  @IsNotEmpty()
  estado_encontrado: EstadoEncontrado;

  @IsInt()
  @IsNotEmpty()
  id_chequeo: number;

  @IsInt()
  @IsNotEmpty()
  id_item: number;
}
