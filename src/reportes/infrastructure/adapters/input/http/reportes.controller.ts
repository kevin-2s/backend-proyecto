import { Controller, Get, Res, Header } from '@nestjs/common';
import { Response } from 'express';
import { ReportesService } from '../../../../application/services/reportes.service';

@Controller('reportes')
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @Get('inventario')
  @Header('Content-Type', 'application/pdf')
  async getInventarioPdf(@Res() res: Response) {
    const buffer = await this.reportesService.generarReporteInventarioPDF();
    res.set({ 'Content-Type': 'application/pdf', 'Content-Disposition': 'attachment; filename="inventario.pdf"' });
    res.send(buffer);
  }

  @Get('inventario/excel')
  async getInventarioExcel(@Res() res: Response) {
    const buffer = await this.reportesService.generarReporteInventarioExcel();
    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="inventario.xlsx"',
    });
    res.send(buffer);
  }

  @Get('solicitudes')
  @Header('Content-Type', 'application/pdf')
  async getSolicitudesPdf(@Res() res: Response) {
    const buffer = await this.reportesService.generarReporteSolicitudesPDF();
    res.set({ 'Content-Type': 'application/pdf', 'Content-Disposition': 'attachment; filename="solicitudes.pdf"' });
    res.send(buffer);
  }

  @Get('prestamos/excel')
  async getPrestamosExcel(@Res() res: Response) {
    const buffer = await this.reportesService.generarReportePrestamosExcel();
    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="prestamos.xlsx"',
    });
    res.send(buffer);
  }

  @Get('kardex')
  @Header('Content-Type', 'application/pdf')
  async getKardexPdf(@Res() res: Response) {
    const buffer = await this.reportesService.generarReporteKardexPDF();
    res.set({ 'Content-Type': 'application/pdf', 'Content-Disposition': 'attachment; filename="kardex.pdf"' });
    res.send(buffer);
  }

  @Get('usuarios/excel')
  async getUsuariosExcel(@Res() res: Response) {
    const buffer = await this.reportesService.generarReporteUsuariosExcel();
    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="usuarios.xlsx"',
    });
    res.send(buffer);
  }
}
