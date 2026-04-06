import { Movimiento } from '../../domain/entities/movimiento.entity';
import { MovimientoEntity } from '../entities/movimiento.typeorm.entity';
import { TipoMovimiento } from '../../../shared/domain/enums';
import { ProductoEntity } from '../../../productos/infrastructure/entities/producto.typeorm.entity';
import { UsuarioEntity } from '../../../users/infrastructure/entities/usuario.typeorm.entity';
import { SitioEntity } from '../../../sitios/infrastructure/entities/sitio.typeorm.entity';

export class MovimientoMapper {
    static toDomain(entity: MovimientoEntity): Movimiento {
        return new Movimiento(
            Number(entity.id),
            String(entity.tipo),
            entity.cantidad,
            entity.fecha || new Date(),
            entity.observaciones || '',
            entity.producto ? Number(entity.producto.id) : 0,
            entity.usuario ? Number(entity.usuario.id) : 0,
            entity.sitio ? Number(entity.sitio.id) : 0
        );
    }
    static toEntity(domain: any): MovimientoEntity {
        const entity = new MovimientoEntity();
        if (domain.id && !isNaN(Number(domain.id))) entity.id = Number(domain.id);
        
        entity.tipo = domain.tipo as TipoMovimiento || TipoMovimiento.ENTRADA;
        entity.cantidad = domain.cantidad || 1;
        entity.observaciones = domain.observaciones || '';
        entity.fecha = domain.createdAt || new Date();

        if (domain.productoId && !isNaN(Number(domain.productoId))) {
            entity.producto = new ProductoEntity();
            entity.producto.id = Number(domain.productoId);
        }
        
        if (domain.usuarioId && !isNaN(Number(domain.usuarioId))) {
            entity.usuario = new UsuarioEntity();
            entity.usuario.id = Number(domain.usuarioId);
        }

        if (domain.sitioId && !isNaN(Number(domain.sitioId))) {
            entity.sitio = new SitioEntity();
            entity.sitio.id = Number(domain.sitioId);
        }

        return entity;
    }
}
