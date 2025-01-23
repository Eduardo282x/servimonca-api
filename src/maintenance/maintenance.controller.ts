import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MaintenanceService, statusMaintenance, statusMaintenanceSparePart } from './maintenance.service';
import { Maintenance, MaintenanceSparePart } from '@prisma/client';
import { DtoMaintenance, DtoMaintenanceSparePart, DtoUpdateCompleteMaintenance, DtoUpdateMaintenance, DtoUpdateStatusMaintenance } from 'src/dtos/maintenance.dto';

@Controller('maintenance')
export class MaintenanceController {

    constructor(private mainteanceService: MaintenanceService) {
    }

    @Get('/:status')
    async getMaintenance(@Param('status') status: statusMaintenance): Promise<Maintenance[]> {
        return await this.mainteanceService.getMaintenances(status);
    }
    @Get('/client/:status')
    async getMaintenanceClient(@Param('status') status: statusMaintenance): Promise<Maintenance[]> {
        return await this.mainteanceService.getMaintenanceClient(status);
    }
    @Get('/all/:status')
    async getMaintenancesAll(@Param('status') status: statusMaintenance): Promise<Maintenance[]> {
        return await this.mainteanceService.getMaintenancesAll(status);
    }

    @Get('/sparePart/all')
    async getMaintenanceSparePartAll(): Promise<MaintenanceSparePart[]> {
        return await this.mainteanceService.getMaintenanceSparePartAll();
    }
    @Get('/sparePart/:status')
    async getMaintenanceSparePart(@Param('status') status: statusMaintenanceSparePart): Promise<MaintenanceSparePart[]> {
        return await this.mainteanceService.getMaintenanceSparePart(status);
    }

    @Post('/sparePart')
    async requestSparePartMaintenance(@Body() newMaintenance: DtoMaintenanceSparePart) {
        return await this.mainteanceService.requestSparePartMaintenance(newMaintenance);
    }

    @Post()
    async createMaintenance(@Body() newMaintenance: DtoMaintenance) {
        return await this.mainteanceService.createMaintenance(newMaintenance);
    }

    @Put('/sparePart/status')
    async updateStatusMaintenanceSpare(@Body() maintenance: DtoUpdateStatusMaintenance) {
        return await this.mainteanceService.updateStatusMaintenanceSpare(maintenance);
    }
    @Put('/status')
    async updateStatusMaintenance(@Body() maintenance: DtoUpdateStatusMaintenance) {
        return await this.mainteanceService.updateStatusMaintenance(maintenance);
    }
    @Put('/completed')
    async updateCompleteMaintenance(@Body() maintenance: DtoUpdateCompleteMaintenance) {
        return await this.mainteanceService.updateCompleteMaintenance(maintenance);
    }
}
