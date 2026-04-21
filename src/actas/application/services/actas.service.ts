import { Injectable, Inject } from "@nestjs/common";
import { IActasUseCases } from "../../domain/ports/input/actas-use-cases.interface";
import {
  IActasRepository,
  ACTAS_REPOSITORY,
} from "../../domain/ports/output/actas-repository.interface";
import { Acta } from "../../domain/entities/acta.domain.entity";
import { ActaNotFoundException } from "../../domain/exceptions/acta-not-found.exception";

@Injectable()
export class ActasService implements IActasUseCases {
  constructor(
    @Inject(ACTAS_REPOSITORY)
    private readonly actasRepository: IActasRepository,
  ) {}

  async obtenerActas(): Promise<Acta[]> {
    return this.actasRepository.findAll();
  }

  async obtenerActaPorId(id: number): Promise<Acta> {
    const acta = await this.actasRepository.findById(id);
    if (!acta) {
      throw new ActaNotFoundException(id);
    }
    return acta;
  }

  async crearActa(data: {
    url_pdf: string;
    id_solicitud: number;
    id_usuario: number;
  }): Promise<Acta> {
    return this.actasRepository.create({
      ...data,
      fecha: new Date(),
    });
  }
}
