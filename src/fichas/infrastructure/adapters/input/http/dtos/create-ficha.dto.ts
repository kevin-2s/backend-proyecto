import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFichaDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    numeroFicha!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    programa!: string;
}
