import { Injectable, Inject } from '@nestjs/common';
import { ReportesRepository, REPORTES_REPOSITORY } from '../../domain/ports/output/reportes-repository.interface';
import * as ExcelJS from 'exceljs';

// Use pdfmake's printer directly (avoids pdfmake-wrapper ESM issues on Node v24)
// eslint-disable-next-line @typescript-eslint/no-require-imports
const PdfPrinter = require('pdfmake/src/printer');

// Use standard PDF built-in fonts (no font files needed)
const fonts = {
  Helvetica: {
    normal: 'Helvetica',
    bold: 'Helvetica-Bold',
    italics: 'Helvetica-Oblique',
    bolditalics: 'Helvetica-BoldOblique',
  },
};

/** Genera un Buffer a partir de una definición pdfmake */
function buildPdfBuffer(docDefinition: Record<string, any>): Promise<Buffer> {
  const printer = new PdfPrinter(fonts);
  // Default to Helvetica when no font is specified
  const finalDef = { defaultStyle: { font: 'Helvetica' }, ...docDefinition };
  const pdfDoc = printer.createPdfKitDocument(finalDef);
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    pdfDoc.on('data', (chunk: Buffer) => chunks.push(chunk));
    pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
    pdfDoc.on('error', reject);
    pdfDoc.end();
  });
}

/** Fila de encabezado con fondo gris y texto en negrita */
function headerRow(cells: string[]) {
  return cells.map(text => ({
    text,
    bold: true,
    fillColor: '#CCCCCC',
    fontSize: 9,
  }));
}

@Injectable()
export class ReportesService {
  constructor(
    @Inject(REPORTES_REPOSITORY)
    private readonly repo: ReportesRepository,
  ) {}

  // ─── Inventario ─────────────────────────────────────────────────────────────

  async generarReporteInventarioPDF(): Promise<Buffer> {
    const datos = await this.repo.obtenerInventario();
    const tableBody: any[][] = [
      headerRow(['ID', 'Producto', 'Cantidad', 'Ubicación']),
    ];
    datos.forEach(d => {
      tableBody.push([
        { text: String(d.id), fontSize: 9 },
        { text: d.nombre, fontSize: 9 },
        { text: String(d.cantidad), fontSize: 9 },
        { text: d.ubicacion, fontSize: 9 },
      ]);
    });

    return buildPdfBuffer({
      content: [
        { text: 'Reporte de Inventario', style: 'header' },
        { text: '\n' },
        {
          table: { headerRows: 1, widths: ['auto', '*', 'auto', '*'], body: tableBody },
          layout: 'lightHorizontalLines',
        },
      ],
      styles: {
        header: { fontSize: 18, bold: true, alignment: 'center', margin: [0, 0, 0, 10] },
      },
    });
  }

  async generarReporteInventarioExcel(): Promise<Buffer> {
    const datos = await this.repo.obtenerInventario();
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet('Inventario');
    ws.addRow(['ID', 'Producto', 'Cantidad', 'Ubicación']);
    datos.forEach(d => ws.addRow([d.id, d.nombre, d.cantidad, d.ubicacion]));
    const buffer = await wb.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }

  // ─── Solicitudes ────────────────────────────────────────────────────────────

  async generarReporteSolicitudesPDF(): Promise<Buffer> {
    const datos = await this.repo.obtenerSolicitudes();
    const tableBody: any[][] = [
      headerRow(['ID', 'Fecha', 'Tipo', 'Estado', 'Solicitante', 'Ficha']),
    ];
    datos.forEach(d => {
      const fechaStr = d.fecha ? new Date(d.fecha).toLocaleDateString('es-ES') : '—';
      const solicitante = d.usuario?.nombre || `Usuario #${d.id_usuario}`;
      const ficha = d.ficha?.programa || d.ficha?.numeroFicha || '—';
      tableBody.push([
        { text: String(d.id_solicitud), fontSize: 9 },
        { text: fechaStr, fontSize: 9 },
        { text: d.tipo || '—', fontSize: 9 },
        { text: d.estado || '—', fontSize: 9 },
        { text: solicitante, fontSize: 9 },
        { text: ficha, fontSize: 9 },
      ]);
    });

    return buildPdfBuffer({
      content: [
        { text: 'Reporte de Solicitudes', style: 'header' },
        { text: '\n' },
        {
          table: { headerRows: 1, widths: ['auto', 'auto', 'auto', 'auto', '*', '*'], body: tableBody },
          layout: 'lightHorizontalLines',
        },
      ],
      styles: {
        header: { fontSize: 18, bold: true, alignment: 'center', margin: [0, 0, 0, 10] },
      },
    });
  }

  // ─── Préstamos ──────────────────────────────────────────────────────────────

  async generarReportePrestamosExcel(): Promise<Buffer> {
    const datos = await this.repo.obtenerPrestamos();
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet('Prestamos');
    ws.addRow([
      'ID', 'Item/Producto', 'Solicitante', 'Responsable',
      'Fecha Préstamo', 'Fecha Dev. Esperada', 'Fecha Dev. Real', 'Estado', 'Observación',
    ]);
    datos.forEach(d => {
      const itemStr = d.item?.producto?.nombre || `Ítem #${d.id_item}`;
      const solicitante = d.usuario_solicitante?.nombre || `Usuario #${d.id_usuario_solicitante}`;
      const responsable = d.usuario_responsable?.nombre || `Usuario #${d.id_usuario_responsable}`;
      const fPrestamo = d.fecha_prestamo ? new Date(d.fecha_prestamo).toLocaleDateString('es-ES') : '';
      const fEsperada = d.fecha_devolucion_esperada ? new Date(d.fecha_devolucion_esperada).toLocaleDateString('es-ES') : '';
      const fReal = d.fecha_devolucion_real ? new Date(d.fecha_devolucion_real).toLocaleDateString('es-ES') : '—';
      ws.addRow([d.id_prestamo, itemStr, solicitante, responsable, fPrestamo, fEsperada, fReal, d.estado, d.observacion || '']);
    });
    const buffer = await wb.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }

  // ─── Kardex ─────────────────────────────────────────────────────────────────

  async generarReporteKardexPDF(): Promise<Buffer> {
    const datos = await this.repo.obtenerKardex();
    const tableBody: any[][] = [
      headerRow(['ID', 'Item/Producto', 'Tipo', 'Cant.', 'S. Ant.', 'S. Act.', 'Fecha', 'Usuario']),
    ];
    datos.forEach(d => {
      const itemStr = d.item?.producto?.nombre || `Ítem #${d.id_item}`;
      const fechaStr = d.fecha
        ? new Date(d.fecha).toLocaleDateString('es-ES') + ' ' + new Date(d.fecha).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
        : '—';
      const usuarioStr = d.usuario?.nombre || `Usuario #${d.id_usuario}`;
      tableBody.push([
        { text: String(d.id_kardex), fontSize: 8 },
        { text: itemStr, fontSize: 8 },
        { text: d.tipo, fontSize: 8 },
        { text: String(d.cantidad), fontSize: 8 },
        { text: String(d.saldo_anterior), fontSize: 8 },
        { text: String(d.saldo_actual), fontSize: 8 },
        { text: fechaStr, fontSize: 8 },
        { text: usuarioStr, fontSize: 8 },
      ]);
    });

    return buildPdfBuffer({
      pageOrientation: 'landscape',
      content: [
        { text: 'Reporte de Kardex y Auditoría', style: 'header' },
        { text: '\n' },
        {
          table: {
            headerRows: 1,
            widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto', 'auto', '*'],
            body: tableBody,
          },
          layout: 'lightHorizontalLines',
        },
      ],
      styles: {
        header: { fontSize: 18, bold: true, alignment: 'center', margin: [0, 0, 0, 10] },
      },
    });
  }

  // ─── Usuarios ───────────────────────────────────────────────────────────────

  async generarReporteUsuariosExcel(): Promise<Buffer> {
    const datos = await this.repo.obtenerUsuarios();
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet('Usuarios');
    ws.addRow(['ID', 'Nombre', 'Correo', 'Rol', 'Documento', 'Teléfono', 'Estado']);
    datos.forEach(d => {
      const rolStr = d.rol?.nombre || 'Sin Rol';
      const estadoStr = d.estado ? 'Activo' : 'Inactivo';
      ws.addRow([d.id_usuario, d.nombre, d.correo, rolStr, d.documento || '', d.telefono || '', estadoStr]);
    });
    const buffer = await wb.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }
}
