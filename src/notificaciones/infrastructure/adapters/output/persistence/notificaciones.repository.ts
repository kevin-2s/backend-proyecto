import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { INotificacionesRepository } from "../../../../domain/ports/output/notificaciones-repository.interface";
import { NotificacionOrmEntity } from "../../../entities/notificacion.orm-entity";
import { NotificacionMapper } from "../../../mappers/notificacion.mapper";
import { Notificacion } from "../../../../domain/entities/notificacion.domain.entity";

@Injectable()
export class NotificacionesRepositoryAdapter implements INotificacionesRepository {
  constructor(
    @InjectRepository(NotificacionOrmEntity)
    private readonly repository: Repository<NotificacionOrmEntity>,
  ) {}

  async findByUsuarioId(id_usuario: number): Promise<Notificacion[]> {
    const ormList = await this.repository.find({
      where: { id_usuario },
      order: { fecha: "DESC" },
    });
    return ormList.map(NotificacionMapper.toDomain);
  }

  async create(
    data: Omit<Notificacion, "id_notificacion" | "leida" | "fecha" | "usuario">,
  ): Promise<Notificacion> {
    const ormEntity = NotificacionMapper.toEntity({
      ...data,
      leida: false,
      fecha: new Date(),
    });
    const saved = await this.repository.save(ormEntity);
    return NotificacionMapper.toDomain(saved);
  }

  async marcarLeida(id_notificacion: number): Promise<Notificacion> {
    await this.repository.update(id_notificacion, { leida: true });
    const ormEntity = await this.repository.findOne({
      where: { id_notificacion },
    });
    return NotificacionMapper.toDomain(ormEntity!);
  }
}
