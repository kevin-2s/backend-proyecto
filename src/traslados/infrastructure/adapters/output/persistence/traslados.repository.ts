import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ITrasladosRepository } from '../../../../domain/ports/output/traslados-repository.interface';
import { TrasladoOrmEntity } from '../../../entities/traslado.orm-entity';
import { TrasladoMapper } from '../../../mappers/traslado.mapper';
import { Traslado } from '../../../../domain/entities/traslado.domain.entity';
import { ItemOrmEntity } from '../../../../../items/infrastructure/entities/item.orm-entity';
import { SitioOrmEntity } from '../../../../../sitios/infrastructure/entities/sitio.orm-entity';

const RELATIONS = ['item', 'item.producto', 'sitio_origen', 'sitio_destino', 'usuario_solicita', 'usuario_aprueba'];

@Injectable()
export class TrasladosRepositoryAdapter implements ITrasladosRepository {
  constructor(
    @InjectRepository(TrasladoOrmEntity)
    private readonly repository: Repository<TrasladoOrmEntity>,
    @InjectRepository(ItemOrmEntity)
    private readonly itemRepository: Repository<ItemOrmEntity>,
    @InjectRepository(SitioOrmEntity)
    private readonly sitioRepository: Repository<SitioOrmEntity>,
  ) {}

  async findAll(): Promise<Traslado[]> {
    const rows = await this.repository.find({ relations: RELATIONS, order: { fecha_solicitud: 'DESC' } });
    return rows.map(TrasladoMapper.toDomain);
  }

  async findById(id: number): Promise<Traslado | null> {
    const row = await this.repository.findOne({ where: { id_traslado: id }, relations: RELATIONS });
    return row ? TrasladoMapper.toDomain(row) : null;
  }

  async findPendienteByItem(id_item: number): Promise<Traslado | null> {
    const row = await this.repository.findOne({ where: { id_item, estado: 'PENDIENTE' }, relations: RELATIONS });
    return row ? TrasladoMapper.toDomain(row) : null;
  }

  async obtenerUbicacionActualDeItem(id_item: number): Promise<{ id_sitio: number | null; estado: string; descripcion: string } | null> {
    const item = await this.itemRepository.findOne({ where: { id_item }, relations: ['producto'] });
    if (!item) return null;
    const id_sitio = item.id_sitio ?? item.producto?.id_sitio ?? null;
    const referencia = item.placa_sena || item.codigo_sku || `#${item.id_item}`;
    const descripcion = `${item.producto?.nombre ?? 'Ítem'} (${referencia})`;
    return { id_sitio, estado: item.estado, descripcion };
  }

  async obtenerResponsableDeSitio(id_sitio: number): Promise<{ id_responsable: number; nombre_sitio: string } | null> {
    const sitio = await this.sitioRepository.findOne({ where: { id_sitio } });
    if (!sitio?.id_responsable) return null;
    return { id_responsable: sitio.id_responsable, nombre_sitio: sitio.nombre };
  }

  async moverItem(id_item: number, id_sitio_destino: number): Promise<void> {
    await this.itemRepository.update(id_item, { id_sitio: id_sitio_destino });
  }

  async create(data: Omit<Traslado, 'id_traslado' | 'item' | 'sitio_origen' | 'sitio_destino' | 'usuario_solicita' | 'usuario_aprueba'>): Promise<Traslado> {
    const orm = TrasladoMapper.toEntity(data);
    const saved = await this.repository.save(orm);
    return this.findById(saved.id_traslado) as Promise<Traslado>;
  }

  async update(id: number, data: Partial<Traslado>): Promise<Traslado> {
    await this.repository.update(id, TrasladoMapper.toEntity(data));
    return this.findById(id) as Promise<Traslado>;
  }
}
