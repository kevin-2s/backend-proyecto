import { Injectable, Inject } from '@nestjs/common';
import { IKardexUseCases } from '../../domain/ports/input/kardex-use-cases.interface';
import { IKardexRepository, KARDEX_REPOSITORY } from '../../domain/ports/output/kardex-repository.interface';
import { Kardex, TipoKardex } from '../../domain/entities/kardex.domain.entity';

@Injectable()
export class KardexService implements IKardexUseCases {
  constructor(
    @Inject(KARDEX_REPOSITORY)
    private readonly kardexRepository: IKardexRepository,
  ) {}

  async obtenerKardex(): Promise<Kardex[]> {
    return this.kardexRepository.findAll();
  }

  async obtenerKardexPorItem(id_item: number): Promise<Kardex[]> {
    return this.kardexRepository.findByItemId(id_item);
  }

  async crearRegistroKardex(data: {
    tipo: TipoKardex;
    cantidad: number;
    saldo_anterior: number;
    saldo_actual: number;
    fecha: Date;
    observacion: string | null;
    id_item: number;
    id_usuario: number;
  }): Promise<Kardex> {
    return this.kardexRepository.create(data);
  }
}
