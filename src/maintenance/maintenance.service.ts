import { Injectable } from '@nestjs/common';
import { Maintenance } from '@prisma/client';
import { DtoBaseResponse, baseResponse } from 'src/dtos/base.dto';
import { DtoMaintenance, DtoUpdateCompleteMaintenance, DtoUpdateMaintenance, DtoUpdateStatusMaintenance } from 'src/dtos/maintenance.dto';
import { PrismaService } from 'src/prisma/prisma.service';

export type statusMaintenance = 'Completado' | 'Procesando' | 'Denegado' | 'Pendiente'

@Injectable()
export class MaintenanceService {

    constructor(private prismaService: PrismaService) { }

    async getMaintenances(status: statusMaintenance): Promise<Maintenance[]> {
        return await this.prismaService.maintenance.findMany({
            orderBy: {
                id: 'asc'
            },
            where: {
                status: status,
                clientId: null
            },
            include: {
                equipment: true,
                sparePart: true
            }
        });
    }

    async getMaintenancesAll(status: statusMaintenance): Promise<Maintenance[]> {
        return await this.prismaService.maintenance.findMany({
            orderBy: {
                id: 'asc'
            },
            where: {
                status: status,
            },
            include: {
                equipment: true,
                sparePart: true
            }
        });
    }

    async getMaintenanceClient(status: statusMaintenance): Promise<Maintenance[]> {
        return await this.prismaService.maintenance.findMany({
            orderBy: {
                id: 'asc'
            },
            where: {
                status: status,
                clientId: {
                    not: null
                },
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
                    clientId: newMaintenance.clientId ? newMaintenance.clientId : null,
                    amount: newMaintenance.amount,
                    status: 'Pendiente',
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

    async updateStatusMaintenance(maintenance: DtoUpdateStatusMaintenance): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.maintenance.update({
                data: {
                    status: maintenance.status,
                },
                where: {
                    id: maintenance.id
                }
            });
            baseResponse.message = 'Estado del mantenimiento actualizado.';
            return baseResponse;
        } catch (err) {
            baseResponse.message += err.message;
            return baseResponse;
        }
    }

    async updateCompleteMaintenance(maintenance: DtoUpdateCompleteMaintenance): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.maintenance.update({
                data: {
                    description: maintenance.description,
                    status: 'Completado'
                },
                where: {
                    id: maintenance.id
                }
            });
            baseResponse.message = 'Mantenimiento completado.';
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
                    status: '',
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
