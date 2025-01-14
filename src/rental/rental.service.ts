import { Injectable } from '@nestjs/common';
import { Rental } from '@prisma/client';
import { DtoBaseResponse, baseResponse } from 'src/dtos/base.dto';
import { DtoRental, DtoUpdateRental } from 'src/dtos/rental.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RentalService {

    constructor(private prismaService: PrismaService) { }

    async getRentals(): Promise<Rental[]> {
        return await this.prismaService.rental.findMany({
            orderBy:{
                id: 'asc'
            },
            include: {
                client: true,
                equipment: true,
            }
        });
    }

    async createRent(newRent: DtoRental): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.rental.create({
                data: {
                    clientId: newRent.clientId,
                    equipmentId: newRent.equipmentId,
                    rentalStartDate: newRent.rentalStartDate,
                    rentalEndDate: newRent.rentalEndDate,
                    totalCost: newRent.totalCost,
                    paymentId: newRent.paymentId,
                    status: newRent.status,
                    checked: newRent.checked,
                    description: newRent.description
                },
            });
            baseResponse.message = 'Renta creado exitosamente';
            return baseResponse;
        } catch (err) {
            baseResponse.message += err.message;
            return baseResponse;
        }
    }

    async updateRent(rent: DtoUpdateRental): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.rental.update({
                data: {
                    clientId: rent.clientId,
                    equipmentId: rent.equipmentId,
                    rentalStartDate: rent.rentalStartDate,
                    rentalEndDate: rent.rentalEndDate,
                    totalCost: rent.totalCost,
                    paymentId: rent.paymentId,
                    status: rent.status,
                    checked: rent.checked,
                    description: rent.description
                },
                where: {
                    id: rent.id
                }
            });
            baseResponse.message = 'Renta actualizado exitosamente';
            return baseResponse;
        } catch (err) {
            baseResponse.message += err.message;
            return baseResponse;
        }
    }

    async deleteRent(id: number): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.rental.delete({
                where: {
                    id: id
                }
            });
            baseResponse.message = 'Renta eliminado exitosamente';
            return baseResponse;
        } catch (err) {
            baseResponse.message += err.message;
            return baseResponse;
        }
    }
}
