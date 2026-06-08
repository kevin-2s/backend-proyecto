import { IsInt, IsNumber, IsString, IsNotEmpty, IsOptional, IsPositive, IsIn } from 'class-validator';

export class CreateOrdenCompraDto {
  @IsInt()
  @IsPositive()
  id_proveedor: number;

  @IsInt()
  @IsPositive()
  id_item: number;

  @IsInt()
  @IsPositive()
  cantidad: number;

  @IsNumber()
  @IsPositive()
  precio_unitario: number;

  @IsOptional()
  @IsString()
  observacion?: string;
}
