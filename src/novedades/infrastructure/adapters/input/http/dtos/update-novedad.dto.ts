import { IsEnum, IsNotEmpty } from 'class-validator';
import { EstadoNovedad } from '../../../../../domain/entities/novedad.domain.entity';

export class UpdateNovedadDto {
  @IsEnum(EstadoNovedad)
  @IsNotEmpty()
  estado: string;
}
