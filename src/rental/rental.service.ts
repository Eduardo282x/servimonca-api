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
            include: {
                customer: true,
                equipment: true,
            }
        });
    }

    async createRent(newRent: DtoRental): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.rental.create({
                data: {
                    customerId: newRent.customerId,
                    equipmentId: newRent.equipmentId,
                    rentalStartDate: newRent.rentalStartDate,
                    rentalEndDate: newRent.rentalEndDate,
                    rentalRate: 0.00,
                    // rentalRate: rent.rentalRate,
                    totalCost: 0.00,
                    // totalCost: rent.totalCost,
                    paymentId: newRent.paymentId
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
                    customerId: rent.customerId,
                    equipmentId: rent.equipmentId,
                    rentalStartDate: rent.rentalStartDate,
                    rentalEndDate: rent.rentalEndDate,
                    rentalRate: 0.00,
                    // rentalRate: rent.rentalRate,
                    totalCost: 0.00,
                    // totalCost: rent.totalCost,
                    paymentId: rent.paymentId
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
