import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TipoSitio } from '../../../../../../shared/domain/enums';

export class CreateSitioDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nombreSitio!: string;

    @ApiProperty({ enum: TipoSitio })
    @IsEnum(TipoSitio)
    @IsNotEmpty()
    tipo!: TipoSitio;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    responsableId!: number;
}
