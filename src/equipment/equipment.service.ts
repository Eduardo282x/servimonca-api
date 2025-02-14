import { Injectable } from '@nestjs/common';
import { Equipment } from '@prisma/client';
import { baseResponse, DtoBaseResponse } from 'src/dtos/base.dto';
import { DtoEquipment, DtoUpdateEquipment } from 'src/dtos/equipment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

export type statusEquipment = 'Disponible' | 'Usado' | 'Mantenimiento';


@Injectable()
export class EquipmentService {

    constructor(private prismaService: PrismaService) { }

    async getEquipmentAll(): Promise<Equipment[]> {
        return await this.prismaService.equipment.findMany({
            orderBy: {
                id: 'desc'
            }
        });
    }
    async getEquipment(status: statusEquipment): Promise<Equipment[]> {
        return await this.prismaService.equipment.findMany({
            orderBy: {
                id: 'desc'
            },
            where: {
                currentStatus: status 
            }
        });
    }

    async createEquipment(newEquipment: DtoEquipment): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.equipment.create({
                data: {
                    model: newEquipment.model,
                    serialNumber: newEquipment.serialNumber,
                    currentStatus: newEquipment.currentStatus,
                    placa: newEquipment.placa
                },
            });
            baseResponse.message = 'Equipo agregado exitosamente';
            return baseResponse;
        } catch (err) {
            baseResponse.message = err.message;
            return baseResponse;
        }
    }

    async updateEquipment(equipment: DtoUpdateEquipment): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.equipment.update({
                data: {
                    model: equipment.model,
                    serialNumber: equipment.serialNumber,
                    currentStatus: equipment.currentStatus,
                    placa: equipment.placa
                },
                where: {
                    id: equipment.id
                }
            });
            baseResponse.message = 'Equipo actualizado exitosamente';
            return baseResponse;
        } catch (err) {
            baseResponse.message = err.message;
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
            baseResponse.message = err.message;
            return baseResponse;
        }
    }
}
