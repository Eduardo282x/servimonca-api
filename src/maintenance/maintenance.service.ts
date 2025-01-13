import { Injectable } from '@nestjs/common';
import { Maintenance } from '@prisma/client';
import { DtoBaseResponse, baseResponse } from 'src/dtos/base.dto';
import { DtoMaintenance, DtoUpdateMaintenance } from 'src/dtos/maintenance.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MaintenanceService {

    constructor(private prismaService: PrismaService) { }

    async getMaintenances(): Promise<Maintenance[]> {
        return await this.prismaService.maintenance.findMany({
            orderBy:{
                id: 'asc'
            },
            include: {
                equipment: true
            }
        });
    }

    async createMaintenance(newMaintenance: DtoMaintenance): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.maintenance.create({
                data: {
                    maintenanceType: newMaintenance.maintenanceType,
                    maintenanceDate: newMaintenance.maintenanceDate,
                    description: newMaintenance.description,
                    equipmentId: newMaintenance.equipmentId
                },
            });
            baseResponse.message = 'Mantenimiento registrado exitosamente';
            return baseResponse;
        } catch (err) {
            baseResponse.message += err.message;
            return baseResponse;
        }
    }

    async updateMaintenance(maintenance: DtoUpdateMaintenance): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.maintenance.update({
                data: {
                    maintenanceType: maintenance.maintenanceType,
                    maintenanceDate: maintenance.maintenanceDate,
                    description: maintenance.description,
                    equipmentId: maintenance.equipmentId
                },
                where: {
                    id: maintenance.id
                }
            });
            baseResponse.message = 'Mantenimiento actualizado exitosamente';
            return baseResponse;
        } catch (err) {
            baseResponse.message += err.message;
            return baseResponse;
        }
    }

    async deleteMaintenance(id: number): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.maintenance.delete({
                where: {
                    id: id
                }
            });
            baseResponse.message = 'Usuario eliminado exitosamente';
            return baseResponse;
        } catch (err) {
            baseResponse.message += err.message;
            return baseResponse;
        }
    }
}
