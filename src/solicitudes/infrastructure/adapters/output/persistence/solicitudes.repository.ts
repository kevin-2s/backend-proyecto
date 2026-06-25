import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ISolicitudesRepository } from '../../../../domain/ports/output/solicitudes-repository.interface';
import { SolicitudOrmEntity } from '../../../entities/solicitud.orm-entity';
import { SolicitudMapper } from '../../../mappers/solicitud.mapper';
import { Solicitud } from '../../../../domain/entities/solicitud.domain.entity';
import { ProductoOrmEntity } from '../../../../../productos/infrastructure/entities/producto.orm-entity';
import { SitioOrmEntity } from '../../../../../sitios/infrastructure/entities/sitio.orm-entity';
import { NotificacionOrmEntity } from '../../../../../notificaciones/infrastructure/entities/notificacion.orm-entity';
import { ItemOrmEntity } from '../../../../../items/infrastructure/entities/item.orm-entity';

const RELATIONS = ['usuario', 'usuario_aprueba', 'ficha', 'producto'];

@Injectable()
export class SolicitudesRepositoryAdapter implements ISolicitudesRepository {
  constructor(
    @InjectRepository(SolicitudOrmEntity)
    private readonly repository: Repository<SolicitudOrmEntity>,
    @InjectRepository(ProductoOrmEntity)
    private readonly productoRepository: Repository<ProductoOrmEntity>,
    @InjectRepository(SitioOrmEntity)
    private readonly sitioRepository: Repository<SitioOrmEntity>,
    @InjectRepository(NotificacionOrmEntity)
    private readonly notificacionRepository: Repository<NotificacionOrmEntity>,
    @InjectRepository(ItemOrmEntity)
    private readonly itemRepository: Repository<ItemOrmEntity>,
  ) {}

  async findAll(): Promise<Solicitud[]> {
    const rows = await this.repository.find({ relations: RELATIONS, order: { fecha: 'DESC' } });
    return rows.map(SolicitudMapper.toDomain);
  }

  async findById(id: number): Promise<Solicitud | null> {
    const row = await this.repository.findOne({ where: { id_solicitud: id }, relations: RELATIONS });
    if (!row) return null;
    return SolicitudMapper.toDomain(row);
  }

  async getResponsableForProducto(id_producto: number): Promise<{ id_responsable: number; nombre_producto: string; nombre_bodega: string } | null> {
    const producto = await this.productoRepository.findOne({ where: { id_producto } });
    if (!producto?.id_sitio) return null;
    const sitio = await this.sitioRepository.findOne({ where: { id_sitio: producto.id_sitio } });
    if (!sitio?.id_responsable) return null;
    return {
      id_responsable: sitio.id_responsable,
      nombre_producto: producto.nombre,
      nombre_bodega: sitio.nombre,
    };
  }

  async marcarEntregada(id: number): Promise<Solicitud> {
    const solicitud = await this.findById(id);
    if (!solicitud) throw new Error(`Solicitud ${id} no encontrada`);

    // 1. Actualizar estado
    await this.repository.update(id, { estado: 'ENTREGADA' as any });

    // 2. Marcar N ítems DISPONIBLES del producto como PRESTADO
    const itemsDisponibles = await this.itemRepository.find({
      where: { id_producto: solicitud.id_producto, estado: 'DISPONIBLE' },
    });
    const itemsAMarcar = itemsDisponibles.slice(0, solicitud.cantidad);
    for (const item of itemsAMarcar) {
      await this.itemRepository.update(item.id_item, { estado: 'PRESTADO' });
    }

    // 3. Verificar si el stock restante cae por debajo del mínimo
    const restantes = await this.itemRepository.count({
      where: { id_producto: solicitud.id_producto, estado: 'DISPONIBLE' },
    });
    const producto = await this.productoRepository.findOne({ where: { id_producto: solicitud.id_producto } });
    if (producto && restantes < (producto.stock_minimo ?? 0)) {
      const responsable = await this.getResponsableForProducto(solicitud.id_producto);
      if (responsable?.id_responsable) {
        await this.notificacionRepository.save({
          mensaje: `⚠️ Stock bajo: "${producto.nombre}" tiene ${restantes} unidad(es) disponible(s), por debajo del mínimo de ${producto.stock_minimo}.`,
          id_usuario: responsable.id_responsable,
          leida: false,
          fecha: new Date(),
        });
      }
    }

    return this.findById(id) as Promise<Solicitud>;
  }

  async create(data: Omit<Solicitud, 'id_solicitud' | 'usuario' | 'usuario_aprueba' | 'ficha' | 'producto'>): Promise<Solicitud> {
    const orm = SolicitudMapper.toEntity(data);
    const saved = await this.repository.save(orm);
    return this.findById(saved.id_solicitud) as Promise<Solicitud>;
  }

  async update(id: number, data: Partial<Solicitud>): Promise<Solicitud> {
    await this.repository.update(id, data);
    return this.findById(id) as Promise<Solicitud>;
  }
}
