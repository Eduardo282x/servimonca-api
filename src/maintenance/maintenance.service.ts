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
            orderBy: {
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
                    equipmentId: newMaintenance.equipmentId,
                    sparePartId: newMaintenance.sparePartId,
                    type: newMaintenance.type,
                    status: newMaintenance.status,
                    description: newMaintenance.description,
                    maintenanceDate: newMaintenance.maintenanceDate
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
                    equipmentId: maintenance.equipmentId,
                    sparePartId: maintenance.sparePartId,
                    type: maintenance.type,
                    description: maintenance.description,
                    status: maintenance.status,
                    maintenanceDate: maintenance.maintenanceDate
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
