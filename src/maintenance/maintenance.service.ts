import { Injectable } from '@nestjs/common';
import { Maintenance, MaintenanceSparePart } from '@prisma/client';
import { DtoBaseResponse, baseResponse } from 'src/dtos/base.dto';
import { DtoMaintenance, DtoMaintenanceSparePart, DtoUpdateCompleteMaintenance, DtoUpdateMaintenance, DtoUpdateStatusMaintenance } from 'src/dtos/maintenance.dto';
import { PrismaService } from 'src/prisma/prisma.service';

export type statusMaintenance = 'Completado' | 'Procesando' | 'Denegado' | 'Pendiente';
export type statusMaintenanceSparePart = 'Instalado' | 'Solicitado' | 'Denegado' | 'Aprobado';

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
            }
        });
    }

    async getMaintenanceSparePartAll(): Promise<MaintenanceSparePart[]> {
        return await this.prismaService.maintenanceSparePart.findMany({
            orderBy: {
                id: 'asc'
            },
            include: {
                sparePart: true,
            }
        });
    }

    async getMaintenanceSparePart(status: statusMaintenanceSparePart): Promise<MaintenanceSparePart[]> {
        return await this.prismaService.maintenanceSparePart.findMany({
            orderBy: {
                id: 'asc'
            },
            where: {
                status: status,
            },
            include: {
                sparePart: true,
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
                client: true
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
                equipment: true,
                client: true
            }
        });
    }

    async requestSparePartMaintenance(sparePartMaintenance: DtoMaintenanceSparePart): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.maintenanceSparePart.create({
                data: {
                    sparePartId: sparePartMaintenance.sparePartId,
                    amount: sparePartMaintenance.amount,
                    status: 'Solicitado'
                },
            });
            baseResponse.message = 'Repuesto solicitado';
            return baseResponse;
        } catch (err) {
            baseResponse.message += err.message;
            return baseResponse;
        }
    }

    async createMaintenance(newMaintenance: DtoMaintenance): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.maintenance.create({
                data: {
                    equipmentId: newMaintenance.equipmentId,
                    type: newMaintenance.type,
                    clientId: newMaintenance.clientId ? newMaintenance.clientId : null,
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

    async updateStatusMaintenanceSpare(maintenance: DtoUpdateStatusMaintenance): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.maintenanceSparePart.update({
                data: {
                    status: maintenance.status,
                },
                where: {
                    id: maintenance.id
                }
            });
            baseResponse.message = 'Solicitud actualizada.';
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
}
