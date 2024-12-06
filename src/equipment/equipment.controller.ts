import { Controller, Get } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { Equipment } from '@prisma/client';

@Controller('equipment')
export class EquipmentController {

    constructor(private equipmentService: EquipmentService) {}

    @Get()
    async getEquipment(): Promise<Equipment[]> {
        return await this.equipmentService.getEquipment();
    }
}
