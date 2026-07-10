import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IDevolucionesRepository } from '../../../../domain/ports/output/devoluciones-repository.interface';
import { DevolucionOrmEntity } from '../../../entities/devolucion.orm-entity';
import { DevolucionMapper } from '../../../mappers/devolucion.mapper';
import { Devolucion } from '../../../../domain/entities/devolucion.domain.entity';
import { SolicitudOrmEntity } from '../../../../../solicitudes/infrastructure/entities/solicitud.orm-entity';
import { ProductoOrmEntity } from '../../../../../productos/infrastructure/entities/producto.orm-entity';
import { NotificacionOrmEntity } from '../../../../../notificaciones/infrastructure/entities/notificacion.orm-entity';

const ESTADO_LABEL: Record<string, string> = {
  BUENO: 'en buen estado',
  REGULAR: 'en estado regular',
  DAÑADO: 'dañado',
  PERDIDO: 'como perdido/extraviado',
};

@Injectable()
export class DevolucionesRepositoryAdapter implements IDevolucionesRepository {
  constructor(
    @InjectRepository(DevolucionOrmEntity)
    private readonly repository: Repository<DevolucionOrmEntity>,
    @InjectRepository(SolicitudOrmEntity)
    private readonly solicitudRepository: Repository<SolicitudOrmEntity>,
    @InjectRepository(ProductoOrmEntity)
    private readonly productoRepository: Repository<ProductoOrmEntity>,
    @InjectRepository(NotificacionOrmEntity)
    private readonly notificacionRepository: Repository<NotificacionOrmEntity>,
  ) {}

  async findAll(): Promise<Devolucion[]> {
    const devolucionesOrm = await this.repository.find({ relations: ['solicitud', 'usuario_recibe'] });
    return devolucionesOrm.map(DevolucionMapper.toDomain);
  }

  async findById(id: number): Promise<Devolucion | null> {
    const devolucionOrm = await this.repository.findOne({ where: { id_devolucion: id }, relations: ['solicitud', 'usuario_recibe'] });
    if (!devolucionOrm) return null;
    return DevolucionMapper.toDomain(devolucionOrm);
  }

  async create(devolucionData: Omit<Devolucion, 'id_devolucion' | 'solicitud' | 'usuario_recibe'>): Promise<Devolucion> {
    const ormEntity = DevolucionMapper.toEntity(devolucionData);
    const saved = await this.repository.save(ormEntity);

    // Notificar al solicitante original que su devolución fue registrada
    try {
      const solicitud = await this.solicitudRepository.findOne({ where: { id_solicitud: devolucionData.id_solicitud } });
      if (solicitud?.id_usuario) {
        const producto = solicitud.id_producto
          ? await this.productoRepository.findOne({ where: { id_producto: solicitud.id_producto } })
          : null;
        const label = ESTADO_LABEL[devolucionData.estado] ?? devolucionData.estado.toLowerCase();
        await this.notificacionRepository.save({
          mensaje: `Tu devolución de "${producto?.nombre ?? 'material'}" fue registrada. El material fue recibido ${label}.`,
          id_usuario: solicitud.id_usuario,
          leida: false,
          fecha: new Date(),
        });
      }
    } catch { /* no interrumpir */ }

    return DevolucionMapper.toDomain(saved);
  }
}
