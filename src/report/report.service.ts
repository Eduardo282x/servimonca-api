import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as PDFDocument from 'pdfkit';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { EquipmentService, statusEquipment } from 'src/equipment/equipment.service';
import { MaintenanceService, statusMaintenance } from 'src/maintenance/maintenance.service';
import { RentalService, statusRental } from 'src/rental/rental.service';
import { Equipment, Rental } from '@prisma/client';
import { IMaintenance, IRental } from 'src/dtos/some.interfaces';

@Injectable()
export class ReportService {

    constructor(private prismaService: PrismaService,
        private equipmentService: EquipmentService,
        private rentalService: RentalService,
        private maintenanceService: MaintenanceService

    ) { }

    async getMostRentedEquipments(): Promise<any> {
        try {
            const mostRentedEquipments = await this.prismaService.rental.groupBy({
                by: ['equipmentId'],
                _count: { equipmentId: true },
                orderBy: { _count: { equipmentId: 'desc' } },
                take: 10, // Opcional: Limitar a los 10 más alquilados
            });

            // Obtener detalles de los equipos
            const equipmentDetails = await Promise.all(
                mostRentedEquipments.map(async (rental) => {
                    const equipment = await this.prismaService.equipment.findUnique({
                        where: { id: rental.equipmentId },
                    });

                    return {
                        equipmentId: rental.equipmentId,
                        model: equipment?.model,
                        serialNumber: equipment?.serialNumber,
                        placa: equipment?.placa,
                        rentalCount: rental._count.equipmentId,
                    };
                })
            );

            return equipmentDetails;
        } catch (error) {
            throw new Error(`Error al obtener los equipos más alquilados: ${error.message}`);
        }
    }

    async generateMostRentedEquipmentsPDF(res: Response) {
        try {
            const mostRentedEquipments = await this.getMostRentedEquipments(); // Llamamos a la función que obtiene los datos

            const doc = new PDFDocument({ margin: 30, size: 'A4' });
            res.setHeader('Content-Disposition', `attachment; filename=Equipos Más Alquilados.pdf`);
            res.setHeader('Content-Type', 'application/pdf');

            doc.pipe(res);

            const imagePath = path.join(__dirname, '../assets/servimoncaLogo.jpg',);
            if (fs.existsSync(imagePath)) {
                doc.image(imagePath, 250, 30, { width: 100 }); // Posición (x, y) y tamaño
            }

            // Título
            doc.moveDown(10);
            doc.fontSize(16).text('Reporte: Equipos Más Alquilados', { align: 'center' });
            doc.moveDown(2);

            const startX = 50;
            let startY = doc.y;

            doc.fontSize(12).font('Helvetica-Bold');
            doc.text('Modelo', startX, startY);
            doc.text('Placa', startX + 150, startY);
            doc.text('Numero Serial', startX + 250, startY);
            doc.text('Veces Alquilado', startX + 350, startY);
            startY += 20;
            doc.moveTo(startX, startY).lineTo(550, startY).stroke();
            startY += 10;

            // Dibujar las filas de notas
            doc.font('Helvetica');
            mostRentedEquipments.forEach((item) => {
                doc.text(item.model, startX, startY);
                doc.text(item.placa, startX + 150, startY);
                doc.text(item.serialNumber, startX + 250, startY);
                doc.text(item.rentalCount, startX + 350, startY);
                startY += 20;
            });
            doc.end();
        } catch (error) {
            throw new Error(`Error al generar PDF: ${error.message}`);
        }
    }

    async getMostRequestedSpareParts(): Promise<any> {
        try {
            const mostRequestedSpareParts = await this.prismaService.maintenanceSparePart.groupBy({
                by: ['sparePartId'],
                _sum: { amount: true }, // Sumamos la cantidad total de repuestos usados
                orderBy: { _sum: { amount: 'desc' } },
                take: 10, // Opcional: Limitar a los 10 más usados
            });

            // Obtener detalles de los repuestos
            const sparePartDetails = await Promise.all(
                mostRequestedSpareParts.map(async (record) => {
                    const sparePart = await this.prismaService.sparePart.findUnique({
                        where: { id: record.sparePartId },
                    });

                    return {
                        sparePartId: record.sparePartId,
                        sparePart: sparePart?.sparePart,
                        model: sparePart?.model,
                        brand: sparePart?.brand,
                        totalUsed: record._sum.amount,
                    };
                })
            );

            return sparePartDetails;
        } catch (error) {
            throw new Error(`Error al obtener los repuestos más solicitados: ${error.message}`);
        }
    }

    async generateMostRequestedSparePartsPDF(res: Response) {
        try {
            const mostRequestedSpareParts = await this.getMostRequestedSpareParts(); // Llamamos a la función que obtiene los datos

            const doc = new PDFDocument({ margin: 30, size: 'A4' });
            res.setHeader('Content-Disposition', `attachment; filename=Repuestos mas solicitados.pdf`);
            res.setHeader('Content-Type', 'application/pdf');
            doc.pipe(res);

            const imagePath = path.join(__dirname, '../assets/servimoncaLogo.jpg',);
            if (fs.existsSync(imagePath)) {
                doc.image(imagePath, 250, 30, { width: 100 }); // Posición (x, y) y tamaño
            } else {
                console.log(`No existe ${imagePath}`);
            }

            // Título
            doc.moveDown(10);
            doc.fontSize(16).text('Reporte: Repuestos Más Solicitados', { align: 'center' });
            doc.moveDown(2);

            const startX = 50;
            let startY = doc.y;

            doc.fontSize(12).font('Helvetica-Bold');
            doc.text('Repuesto', startX, startY);
            doc.text('Modelo', startX + 100, startY);
            doc.text('Marca', startX + 200, startY);
            doc.text('Cantidad Usada', startX + 300, startY);
            startY += 20;
            doc.moveTo(startX, startY).lineTo(550, startY).stroke();
            startY += 10;

            // Dibujar las filas de notas
            doc.font('Helvetica');
            mostRequestedSpareParts.forEach((item) => {
                doc.text(item.sparePart, startX, startY);
                doc.text(item.model, startX + 100, startY);
                doc.text(item.brand, startX + 200, startY);
                doc.text(item.totalUsed, startX + 300, startY);
                startY += 20;
            });

            doc.end();
        } catch (error) {
            throw new Error(`Error al generar PDF: ${error.message}`);
        }
    }

    async generateEquipmentsAvalaiblePDF(status: statusEquipment, res: Response) {
        try {
            const EquipmentsAvalaible:Equipment[] = await this.equipmentService.getEquipment(status); // Llamamos a la función que obtiene los datos

            const doc = new PDFDocument({ margin: 30, size: 'A4' });
            res.setHeader('Content-Disposition', `attachment; filename=Equipos .pdf`);
            res.setHeader('Content-Type', 'application/pdf');

            doc.pipe(res);

            const imagePath = path.join(__dirname, '../assets/servimoncaLogo.jpg',);
            if (fs.existsSync(imagePath)) {
                doc.image(imagePath, 250, 30, { width: 100 }); // Posición (x, y) y tamaño
            }

            // Título
            doc.moveDown(10);
            doc.fontSize(16).text('Reporte: Equipos ', { align: 'center' });
            doc.moveDown(2);

            const startX = 50;
            let startY = doc.y;

            doc.fontSize(12).font('Helvetica-Bold');
            doc.text('Modelo', startX, startY);
            doc.text('Placa', startX + 150, startY);
            doc.text('Numero Serial', startX + 250, startY);
            doc.text('Estado', startX + 350, startY);
            startY += 20;
            doc.moveTo(startX, startY).lineTo(550, startY).stroke();
            startY += 10;

            // Dibujar las filas de notas
            doc.font('Helvetica');
            EquipmentsAvalaible.forEach((item) => {
                doc.text(item.model, startX, startY);
                doc.text(item.placa, startX + 150, startY);
                doc.text(item.serialNumber, startX + 250, startY);
                doc.text(item.currentStatus, startX + 350, startY);
                startY += 20;
            });
            doc.end();
        } catch (error) {
            throw new Error(`Error al generar PDF: ${error.message}`);
        }
    }

    async generateRentalsPDF(status: statusRental, res: Response) {
        try {
            const Rentals: IRental[] = await this.rentalService.getRentals(status) as IRental[]// Llamamos a la función que obtiene los datos

            const doc = new PDFDocument({ margin: 30, size: 'A4' });
            res.setHeader('Content-Disposition', `attachment; filename=Solicitudes de alquiler.pdf`);
            res.setHeader('Content-Type', 'application/pdf');

            doc.pipe(res);

            const imagePath = path.join(__dirname, '../assets/servimoncaLogo.jpg',);
            if (fs.existsSync(imagePath)) {
                doc.image(imagePath, 250, 30, { width: 100 }); // Posición (x, y) y tamaño
            }

            // Título
            doc.moveDown(10);
            doc.fontSize(16).text('Reporte: Solicitudes de alquiler', { align: 'center' });
            doc.moveDown(2);

            const startX = 50;
            let startY = doc.y;

            doc.fontSize(8).font('Helvetica-Bold');
            doc.text('Cliente', startX, startY);
            doc.text('Equipo', startX + 100, startY);
            doc.text('Descripción', startX + 200, startY);
            doc.text('Fecha Inicio', startX + 350, startY);
            doc.text('Fecha Final', startX + 400, startY);
            doc.text('Estado', startX + 450, startY);
            startY += 20;
            doc.moveTo(startX, startY).lineTo(550, startY).stroke();
            startY += 10;

            // Dibujar las filas de notas
            doc.font('Helvetica');
            Rentals.forEach((item) => {
                doc.text(`${item.client.name} ${item.client.lastname}`, startX, startY);
                doc.text(item.equipment.model, startX + 100, startY);
                doc.text(item.description, startX + 200, startY);
              
                doc.text(item.rentalStartDate ? this.formatDate(item.rentalStartDate): '-', startX + 350, startY);
                doc.text(item.rentalEndDate ? this.formatDate(item.rentalEndDate): '-', startX + 400, startY);
                doc.text(item.status, startX + 450, startY);
                startY += 20;
            });
            doc.end();
        } catch (error) {
            throw new Error(`Error al generar PDF: ${error.message}`);
        }
    }

    formatDate = (dateToFormat: string | Date | number): string => {
        const date = new Date(dateToFormat);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
        const year = date.getFullYear();
    
        return `${day}/${month}/${year}`;
    }

    async generateMaintenancePDF(status: statusMaintenance, res: Response) {
        try {
            const Maintenance: IMaintenance[] = await this.maintenanceService.getMaintenances(status) as IMaintenance[]// Llamamos a la función que obtiene los datos

            const doc = new PDFDocument({ margin: 30, size: 'A4' });
            res.setHeader('Content-Disposition', `attachment; filename=Solicitudes de Mantenimiento.pdf`);
            res.setHeader('Content-Type', 'application/pdf');

            doc.pipe(res);

            const imagePath = path.join(__dirname, '../assets/servimoncaLogo.jpg',);
            if (fs.existsSync(imagePath)) {
                doc.image(imagePath, 250, 30, { width: 100 }); // Posición (x, y) y tamaño
            }

            // Título
            doc.moveDown(10);
            doc.fontSize(16).text('Reporte: Solicitudes de Mantenimiento', { align: 'center' });
            doc.moveDown(2);

            const startX = 50;
            let startY = doc.y;

            doc.fontSize(8).font('Helvetica-Bold');
            doc.text('Tipo', startX, startY);
            doc.text('Equipo', startX + 150, startY);
            doc.text('Descripción', startX + 250, startY);       
            doc.text('Fecha Inicio', startX + 400, startY);
            doc.text('Fecha Final', startX + 450, startY);
            //doc.text('Estado', startX + 650, startY);
            startY += 20;
            doc.moveTo(startX, startY).lineTo(550, startY).stroke();
            startY += 10;

            // Dibujar las filas de notas
            doc.font('Helvetica');
            Maintenance.forEach((item) => {
                doc.text(item.type, startX, startY);
                doc.text(item.equipment.model, startX + 150, startY);
                doc.text(item.description, startX + 250, startY);
                doc.text(item.maintenanceDate ? this.formatDate(item.maintenanceDate): '-', startX + 400, startY);
                doc.text(item.maintenanceDateEnd ? this.formatDate(item.maintenanceDateEnd): '-', startX + 450, startY);
                //doc.text(item.status, startX + 650, startY);
                startY += 20;
            });
            doc.end();
        } catch (error) {
            throw new Error(`Error al generar PDF: ${error.message}`);
        }
    }

    async generateMaintenanceClientPDF(status: statusMaintenance, res: Response) {
        try {
            const Maintenance: IMaintenance[] = await this.maintenanceService.getMaintenanceClient(status) as IMaintenance[]// Llamamos a la función que obtiene los datos

            const doc = new PDFDocument({ margin: 30, size: 'A4' });
            res.setHeader('Content-Disposition', `attachment; filename=Solicitudes de Mantenimiento de Clientes.pdf`);
            res.setHeader('Content-Type', 'application/pdf');

            doc.pipe(res);

            const imagePath = path.join(__dirname, '../assets/servimoncaLogo.jpg',);
            if (fs.existsSync(imagePath)) {
                doc.image(imagePath, 250, 30, { width: 100 }); // Posición (x, y) y tamaño
            }

            // Título
            doc.moveDown(10);
            doc.fontSize(16).text('Reporte: Solicitudes de Mantenimiento de Clientes', { align: 'center' });
            doc.moveDown(2);

            const startX = 50;
            let startY = doc.y;

            doc.fontSize(8).font('Helvetica-Bold');
            doc.text('Cliente', startX, startY);           
            doc.text('Equipo', startX + 150, startY);      
            doc.text('Descripción', startX + 250, startY);  
            doc.text('Fecha Inicio', startX + 400, startY);
            doc.text('Fecha Final', startX + 450, startY);
            
            startY += 20;
            doc.moveTo(startX, startY).lineTo(550, startY).stroke();
            startY += 10;

            // Dibujar las filas de notas
            doc.font('Helvetica');
            Maintenance.forEach((item) => {
                doc.text(`${item.client.name} ${item.client.lastname}`, startX, startY);           
                doc.text(item.equipmentClient, startX + 150, startY);
                doc.text(item.description, startX + 250, startY);
                doc.text(item.maintenanceDate ? this.formatDate(item.maintenanceDate): '-', startX + 400, startY);
                doc.text(item.maintenanceDateEnd ? this.formatDate(item.maintenanceDateEnd): '-', startX + 450, startY);
                
                startY += 20;
            });
            doc.end();
        } catch (error) {
            throw new Error(`Error al generar PDF: ${error.message}`);
        }
    }

}
