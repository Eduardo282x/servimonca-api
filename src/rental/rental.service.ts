import { Injectable } from '@nestjs/common';
import { Rental } from '@prisma/client';
import { DtoBaseResponse, baseResponse } from 'src/dtos/base.dto';
import { DtoRental, DtoUpdateStatusRental } from 'src/dtos/rental.dto';
import { PrismaService } from 'src/prisma/prisma.service';

export type statusRental = 'Entregado' | 'Solicitado' | 'Denegado' | 'Recibido';

@Injectable()
export class RentalService {

    constructor(private prismaService: PrismaService) { }

    async getRentalsAll(): Promise<Rental[]> {
        return await this.prismaService.rental.findMany({
            orderBy: {
                id: 'asc'
            },
            include: {
                client: true,
                equipment: true,
                payment: true
            }
        });
    }

    async getRentalsStore(): Promise<Rental[]> {
        return await this.prismaService.rental.findMany({
            orderBy: {
                id: 'asc'
            },
            where: {
                status: {
                    in: ['Entregado', 'Solicitado']
                }
            },
            include: {
                client: true,
                equipment: true,
                payment: true
            }
        });
    }

    async getRentals(status: statusRental): Promise<Rental[]> {
        return await this.prismaService.rental.findMany({
            orderBy: {
                id: 'asc'
            },
            where: {
                status: status
            },
            include: {
                client: true,
                equipment: true,
                payment: true
            }
        });
    }

    async createRent(newRent: DtoRental): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.rental.create({
                data: {
                    clientId: newRent.clientId,
                    equipmentId: newRent.equipmentId,
                    rentalStartDate: null,
                    rentalEndDate: null,
                    totalCost: newRent.totalCost,
                    paymentId: newRent.paymentId,
                    status: 'Solicitado',
                    description: newRent.description
                },
            });
            baseResponse.message = 'Alquiler Solicitada';
            return baseResponse;
        } catch (err) {
            baseResponse.message = err.message;
            return baseResponse;
        }
    }

    async updateStatusRent(rent: DtoUpdateStatusRental): Promise<DtoBaseResponse> {
        try {
            const rentEquipment = await this.prismaService.rental.update({
                data: {
                    status: rent.status,
                },
                where: {
                    id: rent.id
                }
            });

            if (rent.status === 'Entregado') {
                await this.prismaService.equipment.update({
                    data: {
                        currentStatus: 'Usado',
                    },
                    where: {
                        id: rentEquipment.equipmentId
                    }
                })

                await this.prismaService.rental.update({
                    data: {
                        rentalStartDate: new Date(),
                    },
                    where: {
                        id: rent.id
                    }
                })
            }

            if (rent.status === 'Recibido') {
                await this.prismaService.equipment.update({
                    data: {
                        currentStatus: 'Disponible'
                    },
                    where: {
                        id: rentEquipment.equipmentId
                    }
                })

                await this.prismaService.rental.update({
                    data: {
                        rentalEndDate: new Date(),
                    },
                    where: {
                        id: rent.id
                    }
                })
            }
            baseResponse.message = 'Estado actualizado.';
            return baseResponse;
        } catch (err) {
            baseResponse.message = err.message;
            return baseResponse;
        }
    }
}
