import { Controller, Get, Param, Res } from '@nestjs/common';
import { ReportService } from './report.service';
import { Response } from 'express';
import { EquipmentService, statusEquipment } from 'src/equipment/equipment.service';
import { RentalService, statusRental } from 'src/rental/rental.service';
import { MaintenanceService, statusMaintenance } from 'src/maintenance/maintenance.service';

@Controller('report')
export class ReportController {

    constructor(
        private reportService: ReportService,
        private equipmentService: EquipmentService,
        private rentalService: RentalService,
        private maintenanceService: MaintenanceService
    ) {

    }

    @Get('/equipment')
    async getMostRentedEquipments() {
        return await this.reportService.getMostRentedEquipments();
    }

    @Get('/equipmentAvailable/:status')
    async getEquipment(@Param('status') status: statusEquipment) {
        return await this.equipmentService.getEquipment(status);
    }

    @Get('/rentals/:status')
    async getRentalsStore(@Param('status') status: statusRental) {
        return await this.rentalService.getRentals(status);
    }

    @Get('/request/:status')
    async getMaintenances(@Param('status') status: statusMaintenance) {
        return await this.maintenanceService.getMaintenances(status);
    }
    @Get('/requestClient/:status')
    async getMaintenanceClient(@Param('status') status: statusMaintenance) {
        return await this.maintenanceService.getMaintenanceClient(status);
    }

    @Get('/sparePart')
    async getMostRequestedSpareParts() {
        return await this.reportService.getMostRequestedSpareParts();
    }

    @Get('/download/equipment')
    async generateMostRentedEquipmentsPDF(@Res() res: Response) {
        return await this.reportService.generateMostRentedEquipmentsPDF(res);
    }

    @Get('/download/sparePart')
    async generateMostRequestedSparePartsPDF(@Res() res: Response) {
        return this.reportService.generateMostRequestedSparePartsPDF(res);
    }




}
