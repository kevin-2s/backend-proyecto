import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsOptional, IsInt, IsBoolean } from 'class-validator';
import { TipoSitio } from '../../../../../domain/entities/sitio.domain.entity';

export class CreateSitioDto {
  @ApiProperty({ example: 'Bodega Principal', description: 'Nombre del sitio o ambiente' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 'BODEGA', description: 'Tipo de sitio' })
  @IsString()
  @IsNotEmpty()
  tipo: TipoSitio;

  @ApiProperty({ example: 1, description: 'ID del usuario responsable', required: false })
  @IsInt()
  @IsOptional()
  id_responsable?: number;

  @ApiProperty({ example: 1, description: 'ID del centro al que pertenece', required: false })
  @IsInt()
  @IsOptional()
  id_centro?: number;

  @ApiProperty({ example: true, description: 'Estado activo/inactivo del sitio', required: false, default: true })
  @IsBoolean()
  @IsOptional()
  estado?: boolean;
}
