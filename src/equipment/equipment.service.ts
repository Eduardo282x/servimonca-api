import { Injectable } from '@nestjs/common';
import { Equipment, StatusEquipment } from '@prisma/client';
import { baseResponse, DtoBaseResponse } from 'src/dtos/base.dto';
import { DtoEquipment, DtoUpdateEquipment } from 'src/dtos/equipment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EquipmentService {

    constructor(private prismaService: PrismaService) { }

    async getEquipment(): Promise<Equipment[]> {
        return await this.prismaService.equipment.findMany();
    }

    async getStatusEquipment(): Promise<StatusEquipment[]> {
        return await this.prismaService.statusEquipment.findMany();
    }

    async createEquipment(newEquipment: DtoEquipment): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.equipment.create({
                data: {
                    model: newEquipment.model,
                    brand: newEquipment.brand,
                    yearManufactured: newEquipment.yearManufactured,
                    serialNumber: newEquipment.serialNumber,
                    loadCapacity: 0.00,
                    dimensions: newEquipment.dimensions,
                    currentStatusId: newEquipment.currentStatusId,
                },
            });
            baseResponse.message = 'Equipo creado exitosamente';
            return baseResponse;
        } catch (err) {
            baseResponse.message += err.message;
            return baseResponse;
        }
    }

    async updateEquipment(equipment: DtoUpdateEquipment): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.equipment.update({
                data: {
                    model: equipment.model,
                    brand: equipment.brand,
                    yearManufactured: equipment.yearManufactured,
                    serialNumber: equipment.serialNumber,
                    loadCapacity: 0.00,
                    dimensions: equipment.dimensions,
                    currentStatusId: equipment.currentStatusId,
                },
                where: {
                    id: equipment.id
                }
            });
            baseResponse.message = 'Equipo actualizado exitosamente';
            return baseResponse;
        } catch (err) {
            baseResponse.message += err.message;
            return baseResponse;
        }
    }

    async deleteEquipment(id: number): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.equipment.delete({
                where: {
                    id: id
                }
            });
            baseResponse.message = 'Equipo eliminado exitosamente';
            return baseResponse;
        } catch (err) {
            baseResponse.message += err.message;
            return baseResponse;
        }
    }
}
