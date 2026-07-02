import { IsString, IsEmail, IsOptional, IsInt, MinLength, IsBoolean } from 'class-validator';

export class UpdateUsuarioDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsEmail()
  @IsOptional()
  correo?: string;

  @IsString()
  @IsOptional()
  telefono?: string;

  @IsString()
  @IsOptional()
  documento?: string;

  @IsString()
  @IsOptional()
  @MinLength(6)
  password?: string;

  @IsBoolean()
  @IsOptional()
  estado?: boolean;

  @IsInt()
  @IsOptional()
  id_rol?: number;

  @IsString()
  @IsOptional()
  tenant_id?: string;

  @IsInt()
  @IsOptional()
  id_ficha?: number;
}
