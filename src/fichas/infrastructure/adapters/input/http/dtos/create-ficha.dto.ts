import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreateFichaDto {
  @IsString()
  @IsNotEmpty()
  numero_ficha: string;

  @IsString()
  @IsNotEmpty()
  programa: string;

  @IsInt()
  @IsOptional()
  id_responsable?: number;
}
