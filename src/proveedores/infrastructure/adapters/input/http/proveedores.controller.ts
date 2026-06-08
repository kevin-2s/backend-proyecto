import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ProveedoresService } from '../../../../application/services/proveedores.service';
import { CreateProveedorDto } from './dtos/create-proveedor.dto';
import { UpdateProveedorDto } from './dtos/update-proveedor.dto';
import { ProveedorDomainEntity } from '../../../../domain/entities/proveedor.domain.entity';
// Import JwtAuthGuard once authentication is unified (assuming shared module or auth module)

@Controller('proveedores')
export class ProveedoresController {
  constructor(private readonly proveedoresService: ProveedoresService) {}

  @Post()
  async create(@Body() createProveedorDto: CreateProveedorDto): Promise<ProveedorDomainEntity> {
    return await this.proveedoresService.createProveedor(createProveedorDto);
  }

  @Get()
  async findAll(): Promise<ProveedorDomainEntity[]> {
    return await this.proveedoresService.getProveedores();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ProveedorDomainEntity> {
    return await this.proveedoresService.getProveedorById(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProveedorDto: UpdateProveedorDto,
  ): Promise<ProveedorDomainEntity> {
    return await this.proveedoresService.updateProveedor(id, updateProveedorDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.proveedoresService.deleteProveedor(id);
  }
}
