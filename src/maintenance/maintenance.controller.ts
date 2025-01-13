import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { Maintenance } from '@prisma/client';
import { DtoMaintenance, DtoUpdateMaintenance } from 'src/dtos/maintenance.dto';

@Controller('maintenance')
export class MaintenanceController {

    constructor(private mainteanceService: MaintenanceService) {

    }

    @Get()
    async getMaintenance(): Promise<Maintenance[]> {
        return await this.mainteanceService.getMaintenances();
    }

    @Post()
    async createMaintenance(@Body() newMaintenance: DtoMaintenance) {
        return await this.mainteanceService.createMaintenance(newMaintenance);
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
