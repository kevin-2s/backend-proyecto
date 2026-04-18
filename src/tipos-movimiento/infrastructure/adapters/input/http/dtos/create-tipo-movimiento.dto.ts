import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTipoMovimientoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
}
