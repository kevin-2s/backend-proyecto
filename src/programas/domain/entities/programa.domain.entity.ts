import { Area } from '../../../areas/domain/entities/area.domain.entity';

export class Programa {
  constructor(
    public readonly id_programa: number,
    public nombre: string,
    public codigo: string,
    public id_area: number,
    public estado: boolean = true,
    public area?: Area,
  ) {}
}
