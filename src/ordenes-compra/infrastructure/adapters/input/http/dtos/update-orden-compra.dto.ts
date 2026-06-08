import { PartialType } from '@nestjs/mapped-types';
import { CreateOrdenCompraDto } from './create-orden-compra.dto';
import { IsOptional, IsString, IsIn } from 'class-validator';

export class UpdateOrdenCompraDto extends PartialType(CreateOrdenCompraDto) {
  @IsOptional()
  @IsString()
  @IsIn(['PENDIENTE', 'RECIBIDA', 'CANCELADA'])
  estado?: string;
}
