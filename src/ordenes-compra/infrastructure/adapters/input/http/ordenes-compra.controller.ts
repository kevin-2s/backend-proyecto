import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { OrdenesCompraService } from '../../../../application/services/ordenes-compra.service';
import { CreateOrdenCompraDto } from './dtos/create-orden-compra.dto';
import { UpdateOrdenCompraDto } from './dtos/update-orden-compra.dto';
import { OrdenCompraDomainEntity } from '../../../../domain/entities/orden-compra.domain.entity';

@Controller('ordenes-compra')
export class OrdenesCompraController {
  constructor(private readonly ordenesCompraService: OrdenesCompraService) {}

  @Post()
  async create(@Body() createOrdenCompraDto: CreateOrdenCompraDto): Promise<OrdenCompraDomainEntity> {
    return await this.ordenesCompraService.createOrdenCompra(createOrdenCompraDto);
  }

  @Get()
  async findAll(): Promise<OrdenCompraDomainEntity[]> {
    return await this.ordenesCompraService.getOrdenesCompra();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<OrdenCompraDomainEntity> {
    return await this.ordenesCompraService.getOrdenCompraById(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrdenCompraDto: UpdateOrdenCompraDto,
  ): Promise<OrdenCompraDomainEntity> {
    return await this.ordenesCompraService.updateOrdenCompra(id, updateOrdenCompraDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.ordenesCompraService.deleteOrdenCompra(id);
  }
}
