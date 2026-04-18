import { IsString, IsNotEmpty, IsEnum, IsOptional, IsInt } from 'class-validator';
import { TipoSitio } from '../../../../../domain/entities/sitio.domain.entity';

export class CreateSitioDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEnum(TipoSitio)
  @IsNotEmpty()
  tipo: TipoSitio;

  @IsInt()
  @IsOptional()
  id_responsable?: number;
}
