import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { Equipment } from '@prisma/client';
import { DtoEquipment, DtoUpdateEquipment } from 'src/dtos/equipment.dto';

@Controller('equipment')
export class EquipmentController {

    constructor(private equipmentService: EquipmentService) { }

    @Get()
    async getEquipment(): Promise<Equipment[]> {
        return await this.equipmentService.getEquipment();
    }

    @Post()
    async createEquipment(@Body() newEquipment: DtoEquipment) {
        return await this.equipmentService.createEquipment(newEquipment);
    }

    @Put()
    async updateEquipment(@Body() equipment: DtoUpdateEquipment) {
        return await this.equipmentService.updateEquipment(equipment);
    }

    @Delete('/:id')
    async deleteEquipment(@Param('id') id: number) {
        return await this.equipmentService.deleteEquipment(id);
    }
}
