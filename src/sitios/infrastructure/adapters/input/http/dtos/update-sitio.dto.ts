import { PartialType } from '@nestjs/swagger';
import { CreateSitioDto } from './create-sitio.dto';

export class UpdateSitioDto extends PartialType(CreateSitioDto) {}
