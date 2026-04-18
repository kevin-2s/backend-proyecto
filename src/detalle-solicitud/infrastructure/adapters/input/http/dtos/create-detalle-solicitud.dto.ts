import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateDetalleSolicitudDto {
  @IsInt()
  @IsNotEmpty()
  cantidad: number;

  @IsInt()
  @IsNotEmpty()
  id_solicitud: number;

  @IsInt()
  @IsNotEmpty()
  id_producto: number;
}
