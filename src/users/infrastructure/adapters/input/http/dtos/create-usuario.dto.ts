import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    passwordHash!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nombres!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    apellidos!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    rolId!: string;
}
