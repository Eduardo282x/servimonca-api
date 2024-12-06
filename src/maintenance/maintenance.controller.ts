import { Controller, Get } from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { Maintenance } from '@prisma/client';

@Controller('maintenance')
export class MaintenanceController {

    constructor(private mainteanceService: MaintenanceService) {
        
    }

    @Get()
    async getMaintenance(): Promise<Maintenance[]>{
        return await this.mainteanceService.getMaintenances();
    }
}
