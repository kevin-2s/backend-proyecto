import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IdentificarUsuarioBotDto } from './identificar-usuario-bot.dto';

export class BuscarPlacaBotDto extends IdentificarUsuarioBotDto {
  @ApiProperty({ example: 'SENA-2024-001', description: 'Placa SENA del ítem a buscar' })
  @IsString()
  @IsNotEmpty()
  placa: string;
}
