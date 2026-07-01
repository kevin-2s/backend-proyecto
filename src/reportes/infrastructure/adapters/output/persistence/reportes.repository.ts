import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportesRepository } from '../../../../domain/ports/output/reportes-repository.interface';
import { InventarioOrmEntity } from '../../../../../inventario/infrastructure/entities/inventario.orm-entity';
import { SolicitudOrmEntity } from '../../../../../solicitudes/infrastructure/entities/solicitud.orm-entity';
import { KardexOrmEntity } from '../../../../../kardex/infrastructure/entities/kardex.orm-entity';
import { UsuarioOrmEntity } from '../../../../../usuarios/infrastructure/entities/usuario.orm-entity';

@Injectable()
export class ReportesRepositoryAdapter implements ReportesRepository {
  constructor(
    @InjectRepository(InventarioOrmEntity)
    private readonly repository: Repository<InventarioOrmEntity>,
    @InjectRepository(SolicitudOrmEntity)
    private readonly solicitudRepository: Repository<SolicitudOrmEntity>,
    @InjectRepository(KardexOrmEntity)
    private readonly kardexRepository: Repository<KardexOrmEntity>,
    @InjectRepository(UsuarioOrmEntity)
    private readonly usuarioRepository: Repository<UsuarioOrmEntity>,
  ) {}

  async obtenerInventario(): Promise<any[]> {
    const data = await this.repository.find({
      relations: ['item', 'item.producto', 'sitio'],
    });

    return data.map(d => ({
      id: d.id_inventario,
      nombre: d.item?.producto?.nombre || 'Ítem sin producto',
      cantidad: 1,
      ubicacion: d.sitio?.nombre || 'Sin ubicación',
    }));
  }

  async obtenerSolicitudes(): Promise<any[]> {
    return this.solicitudRepository.find({
      relations: ['usuario', 'usuario_aprueba', 'ficha'],
    });
  }

  async obtenerPrestamos(): Promise<any[]> {
    return [];
  }

  async obtenerKardex(): Promise<any[]> {
    return this.kardexRepository.find({
      relations: ['item', 'item.producto', 'usuario'],
    });
  }

  async obtenerUsuarios(): Promise<any[]> {
    return this.usuarioRepository.find({
      relations: ['rol'],
    });
  }
}
