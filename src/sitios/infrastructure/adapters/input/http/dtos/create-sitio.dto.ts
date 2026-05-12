import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsOptional, IsInt } from 'class-validator';
import { TipoSitio } from '../../../../../domain/entities/sitio.domain.entity';

export class CreateSitioDto {
  @ApiProperty({ example: 'Bodega Principal', description: 'Nombre del sitio o ambiente' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: TipoSitio.BODEGA, enum: TipoSitio, description: 'Tipo de sitio' })
  @IsEnum(TipoSitio)
  @IsNotEmpty()
  tipo: TipoSitio;

  @ApiProperty({ example: 1, description: 'ID del usuario responsable', required: false })
  @IsInt()
  @IsOptional()
  id_responsable?: number;
}
