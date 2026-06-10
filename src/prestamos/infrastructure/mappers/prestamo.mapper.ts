import { Prestamo, EstadoPrestamo } from '../../domain/entities/prestamo.domain.entity';
import { PrestamoOrmEntity } from '../entities/prestamo.orm-entity';

export class PrestamoMapper {
  static toDomain(orm: PrestamoOrmEntity): Prestamo {
    return new Prestamo(
      orm.id_prestamo,
      orm.fecha_prestamo,
      orm.fecha_devolucion_esperada,
      orm.fecha_devolucion_real,
      orm.estado as EstadoPrestamo,
      orm.observacion,
      orm.id_item,
      orm.id_usuario_solicitante,
      orm.id_usuario_responsable,
    );
  }

  static toOrm(domain: Omit<Prestamo, 'id_prestamo'>): Partial<PrestamoOrmEntity> {
    return {
      fecha_prestamo: domain.fecha_prestamo,
      fecha_devolucion_esperada: domain.fecha_devolucion_esperada,
      fecha_devolucion_real: domain.fecha_devolucion_real,
      estado: domain.estado,
      observacion: domain.observacion,
      id_item: domain.id_item,
      id_usuario_solicitante: domain.id_usuario_solicitante,
      id_usuario_responsable: domain.id_usuario_responsable,
    };
  }
}
