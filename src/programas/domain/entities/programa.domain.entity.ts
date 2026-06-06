import { Area } from '../../../areas/domain/entities/area.domain.entity';

export class Programa {
  constructor(
    public readonly id_programa: number,
    public codigo: string,
    public nombre: string,
    public id_area: number,
    public area?: Area,
    public estado: boolean = true,
  ) {}
}
