import { PartialType } from '@nestjs/swagger';
import { CreateFichaDto } from './create-ficha.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateFichaDto extends PartialType(CreateFichaDto) {
  @ApiProperty({ example: true, description: 'Estado de la ficha', required: false })
  @IsOptional()
  @IsBoolean()
  estado?: boolean;
}
