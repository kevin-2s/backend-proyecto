import { Injectable, Inject } from "@nestjs/common";
import { IDevolucionesUseCases } from "../../domain/ports/input/devoluciones-use-cases.interface";
import {
  IDevolucionesRepository,
  DEVOLUCIONES_REPOSITORY,
} from "../../domain/ports/output/devoluciones-repository.interface";
import {
  Devolucion,
  EstadoDevolucion,
} from "../../domain/entities/devolucion.domain.entity";
import { DevolucionNotFoundException } from "../../domain/exceptions/devolucion-not-found.exception";

@Injectable()
export class DevolucionesService implements IDevolucionesUseCases {
  constructor(
    @Inject(DEVOLUCIONES_REPOSITORY)
    private readonly devolucionesRepository: IDevolucionesRepository,
  ) {}

  async obtenerDevoluciones(): Promise<Devolucion[]> {
    return this.devolucionesRepository.findAll();
  }

  async obtenerDevolucionPorId(id: number): Promise<Devolucion> {
    const devolucion = await this.devolucionesRepository.findById(id);
    if (!devolucion) {
      throw new DevolucionNotFoundException(id);
    }
    return devolucion;
  }

  async crearDevolucion(data: {
    id_solicitud: number;
    id_item: number;
    estado: EstadoDevolucion;
    observacion?: string;
  }): Promise<Devolucion> {
    return this.devolucionesRepository.create({
      fecha: new Date(),
      estado: data.estado,
      observacion: data.observacion || null,
      id_solicitud: data.id_solicitud,
      id_item: data.id_item,
    });
  }
}
