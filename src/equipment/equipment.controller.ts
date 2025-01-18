import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EquipmentService, statusEquipment } from './equipment.service';
import { Equipment } from '@prisma/client';
import { DtoEquipment, DtoUpdateEquipment } from 'src/dtos/equipment.dto';

@Controller('equipment')
export class EquipmentController {

    constructor(private equipmentService: EquipmentService) { }

    @Get()
    async getEquipmentAll(): Promise<Equipment[]> {
        return await this.equipmentService.getEquipmentAll();
    }
    @Get('/:status')
    async getEquipment(@Param('status') status: statusEquipment): Promise<Equipment[]> {
        return await this.equipmentService.getEquipment(status);
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
