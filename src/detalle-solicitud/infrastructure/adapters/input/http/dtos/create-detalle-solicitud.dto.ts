import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateDetalleSolicitudDto {
  @ApiProperty({ example: 5, description: 'Cantidad solicitada del producto' })
  @IsInt()
  @IsNotEmpty()
  cantidad: number;

  @ApiProperty({ example: 1, description: 'ID de la solicitud asociada' })
  @IsInt()
  @IsNotEmpty()
  id_solicitud: number;

  @ApiProperty({ example: 1, description: 'ID del producto solicitado' })
  @IsInt()
  @IsNotEmpty()
  id_producto: number;
}
