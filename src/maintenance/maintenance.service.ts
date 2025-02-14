import { Injectable } from '@nestjs/common';
import { Maintenance, MaintenanceSparePart } from '@prisma/client';
import { DtoBaseResponse, badResponse, baseResponse } from 'src/dtos/base.dto';
import { DtoMaintenance, DtoMaintenanceSparePart, DtoUpdateAmountMaintenance, DtoUpdateCompleteMaintenance, DtoUpdateMaintenance, DtoUpdateStatusMaintenance } from 'src/dtos/maintenance.dto';
import { PrismaService } from 'src/prisma/prisma.service';

export type statusMaintenance = 'Completado' | 'Procesando' | 'Denegado' | 'Pendiente';
export type statusMaintenanceSparePart = 'Solicitado' | 'Denegado' | 'Aprobado';

@Injectable()
export class MaintenanceService {

    constructor(private prismaService: PrismaService) { }

    async getMaintenances(status: statusMaintenance): Promise<Maintenance[]> {
        return await this.prismaService.maintenance.findMany({
            orderBy: {
                id: 'desc'
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
                id: 'desc'
            },
            include: {
                sparePart: true,
            }
        });
    }

    async getMaintenanceSparePart(status: statusMaintenanceSparePart): Promise<MaintenanceSparePart[]> {
        return await this.prismaService.maintenanceSparePart.findMany({
            orderBy: {
                id: 'desc'
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
                id: 'desc'
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
        console.log('hola');
        
        return await this.prismaService.maintenance.findMany({
            orderBy: {
                id: 'desc'
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

    async getMaintenanceClientAll(): Promise<Maintenance[]> {
        return await this.prismaService.maintenance.findMany({
            orderBy: {
                id: 'desc'
            },
            where: {
                clientId: {
                    not: null
                }
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
            baseResponse.message = err.message;
            return baseResponse;
        }
    }

    async createMaintenance(newMaintenance: DtoMaintenance): Promise<DtoBaseResponse> {
        try {
            if (newMaintenance.equipmentId) {
                await this.prismaService.equipment.update({
                    data: {
                        currentStatus: 'Mantenimiento'
                    },
                    where: {
                        id: newMaintenance.equipmentId
                    }
                })
            }

            await this.prismaService.maintenance.create({
                data: {
                    equipmentId: newMaintenance.equipmentId,
                    equipmentClient: newMaintenance.equipmentClient,
                    type: newMaintenance.type,
                    clientId: newMaintenance.clientId ? newMaintenance.clientId : null,
                    status: newMaintenance.clientId ? 'Pendiente' : 'Procesando',
                    description: newMaintenance.description,
                    maintenanceDate: newMaintenance.maintenanceDate
                },
            });
            baseResponse.message = 'Mantenimiento registrado exitosamente';
            return baseResponse;
        } catch (err) {
            baseResponse.message = err.message;
            return baseResponse;
        }
    }

    async updateAmountMaintenanceSpare(maintenance: DtoUpdateAmountMaintenance): Promise<DtoBaseResponse> {
        try {
            const findMaintenanceSparePart = await this.prismaService.maintenanceSparePart.findFirst({
                where: {
                    id: maintenance.id
                }
            });

            if (findMaintenanceSparePart.amount < maintenance.amount) {
                badResponse.message = 'No hay suficientes repuesto en stock';
                return badResponse;
            }

            await this.prismaService.maintenanceSparePart.update({
                data: {
                    amount: findMaintenanceSparePart.amount - maintenance.amount,
                },
                where: {
                    id: maintenance.id
                }
            });
            baseResponse.message = 'Cantidad de repuestos actualizada.';
            return baseResponse;
        } catch (err) {
            baseResponse.message = err.message;
            return baseResponse;
        }
    }

    async updateStatusMaintenanceSpare(maintenance: DtoUpdateStatusMaintenance): Promise<DtoBaseResponse> {
        try {
            // Obtener el registro de mantenimiento de repuesto solicitado
            const findMaintenanceSparePart = await this.prismaService.maintenanceSparePart.findFirst({
                where: { id: maintenance.id },
            });

            if (!findMaintenanceSparePart) {
                badResponse.message = 'No se encontró el registro de mantenimiento.';
                return badResponse;
            }

            // Obtener el repuesto asociado
            const findSparePart = await this.prismaService.sparePart.findFirst({
                where: { id: findMaintenanceSparePart.sparePartId },
            });

            if (!findSparePart) {
                badResponse.message = 'No se encontró el repuesto asociado.';
                return badResponse;
            }

            // Validar si hay suficiente cantidad en stock
            if (findMaintenanceSparePart.amount > findSparePart.amount && maintenance.status === 'Aprobado') {
                badResponse.message = 'No hay suficientes repuestos en stock.';
                return badResponse;
            }

            // Actualizar cantidad en stock si se aprueba
            if (maintenance.status === 'Aprobado') {
                await this.prismaService.sparePart.update({
                    data: {
                        amount: Number(findSparePart.amount - findMaintenanceSparePart.amount),
                    },
                    where: { id: findMaintenanceSparePart.sparePartId },
                });
            }

            // Actualizar el estado de la solicitud de mantenimiento
            await this.prismaService.maintenanceSparePart.update({
                data: { status: maintenance.status },
                where: { id: maintenance.id },
            });

            if (maintenance.status === 'Aprobado') {
                // Buscar todos los registros relacionados con el mismo sparePartId
                const relatedSpareParts = await this.prismaService.maintenanceSparePart.findMany({
                    where: { sparePartId: findMaintenanceSparePart.sparePartId },
                });

                // Sumar las cantidades de los registros relacionados
                const totalAmount = relatedSpareParts.reduce((sum, part) => sum + part.amount, 0);

                // Conservar solo el primer registro y actualizarlo con la cantidad total
                const [mainRecord, ...duplicates] = relatedSpareParts;
                await this.prismaService.maintenanceSparePart.update({
                    data: { amount: totalAmount },
                    where: { id: mainRecord.id },
                });

                // Eliminar los registros duplicados
                await Promise.all(
                    duplicates.map((duplicate) =>
                        this.prismaService.maintenanceSparePart.delete({
                            where: { id: duplicate.id },
                        })
                    )
                );
            }

            baseResponse.message = 'Solicitud y cantidades actualizadas correctamente.';
            return baseResponse;
        } catch (err) {
            baseResponse.message = `Error al actualizar: ${err.message}`;
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
            baseResponse.message = err.message;
            return baseResponse;
        }
    }

    async updateCompleteMaintenance(maintenance: DtoUpdateCompleteMaintenance): Promise<DtoBaseResponse> {
        try {

            const findMaintenance = await this.prismaService.maintenance.findFirst({
                where: {
                    id: maintenance.id
                }
            })

            await this.prismaService.equipment.update({
                data: {
                    currentStatus: 'Disponible'
                },
                where: {
                    id: findMaintenance.equipmentId
                }
            })

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
            baseResponse.message = err.message;
            return baseResponse;
        }
    }
}
