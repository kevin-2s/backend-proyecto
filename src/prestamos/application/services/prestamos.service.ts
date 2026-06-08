import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrestamosRepositoryInterface } from '../../domain/ports/output/prestamos-repository.interface';
import { PrestamoDomainEntity } from '../../domain/entities/prestamo.domain.entity';
import { CreatePrestamoDto } from '../../infrastructure/adapters/input/http/dtos/create-prestamo.dto';
import { RegistrarDevolucionDto } from '../../infrastructure/adapters/input/http/dtos/registrar-devolucion.dto';

@Injectable()
export class PrestamosService {
  constructor(
    @Inject('PrestamosRepositoryInterface')
    private readonly prestamosRepository: PrestamosRepositoryInterface,
  ) {}

  async crearPrestamo(dto: CreatePrestamoDto): Promise<PrestamoDomainEntity> {
    const prestamo = new PrestamoDomainEntity();
    prestamo.id_item = dto.id_item;
    prestamo.id_usuario = dto.id_usuario;
    prestamo.id_ficha = dto.id_ficha;
    prestamo.fecha_devolucion_esperada = new Date(dto.fecha_devolucion_esperada);
    prestamo.estado = 'ACTIVO';
    prestamo.observacion = dto.observacion;
    return await this.prestamosRepository.create(prestamo);
  }

  async getPrestamos(): Promise<PrestamoDomainEntity[]> {
    return await this.prestamosRepository.findAll();
  }

  async getPrestamosActivos(): Promise<PrestamoDomainEntity[]> {
    return await this.prestamosRepository.findActivos();
  }

  async getPrestamoById(id: number): Promise<PrestamoDomainEntity> {
    const prestamo = await this.prestamosRepository.findById(id);
    if (!prestamo) throw new NotFoundException(`Préstamo con ID ${id} no encontrado`);
    return prestamo;
  }

  async registrarDevolucion(id: number, dto: RegistrarDevolucionDto): Promise<PrestamoDomainEntity> {
    const prestamo = await this.getPrestamoById(id);
    if (prestamo.estado === 'DEVUELTO') {
      throw new BadRequestException('Este préstamo ya fue devuelto');
    }
    const updated = await this.prestamosRepository.update(id, {
      estado: 'DEVUELTO',
      estado_devolucion: dto.estado_devolucion,
      observacion_devolucion: dto.observacion_devolucion,
      fecha_devolucion_real: new Date(),
    });
    if (!updated) throw new NotFoundException(`No se pudo actualizar el préstamo ${id}`);
    return updated;
  }
}
