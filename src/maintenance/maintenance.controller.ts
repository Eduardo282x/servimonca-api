import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MaintenanceService, statusMaintenance } from './maintenance.service';
import { Maintenance } from '@prisma/client';
import { DtoMaintenance, DtoUpdateCompleteMaintenance, DtoUpdateMaintenance, DtoUpdateStatusMaintenance } from 'src/dtos/maintenance.dto';

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

    @Post()
    async createMaintenance(@Body() newMaintenance: DtoMaintenance) {
        return await this.mainteanceService.createMaintenance(newMaintenance);
    }

    @Put('/status')
    async updateStatusMaintenance(@Body() maintenance: DtoUpdateStatusMaintenance) {
        return await this.mainteanceService.updateStatusMaintenance(maintenance);
    }
    @Put('/completed')
    async updateCompleteMaintenance(@Body() maintenance: DtoUpdateCompleteMaintenance) {
        return await this.mainteanceService.updateCompleteMaintenance(maintenance);
    }
    @Put()
    async updateMaintenance(@Body() maintenance: DtoUpdateMaintenance) {
        return await this.mainteanceService.updateMaintenance(maintenance);
    }

    @Delete('/:id')
    async deleteMaintenance(@Param('id') id: number) {
        return await this.mainteanceService.deleteMaintenance(id);
    }
}
