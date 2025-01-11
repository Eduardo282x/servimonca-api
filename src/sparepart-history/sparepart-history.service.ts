import { Injectable } from '@nestjs/common';
import { SparePartHistory } from '@prisma/client';
import { badResponse, baseResponse, DtoBaseResponse } from 'src/dtos/base.dto';
import { DtoSparePartHistory, DtoUpdateSparePartHistory } from 'src/dtos/spare-part-history.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SparepartHistoryService {

    constructor(private prismaService: PrismaService) { }

    async getSparepartHistory(): Promise<SparePartHistory[]> {
        return await this.prismaService.sparePartHistory.findMany({
            orderBy: {
                id: 'asc'
            },
            include: {
                sparePart: true
            }
        });
    }

    async createSparePartHistory(sparePartHistory: DtoSparePartHistory): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.sparePartHistory.create({
                data: {
                    sparePartId: sparePartHistory.sparePartId,
                    operationType: sparePartHistory.operationType,
                    quantity: sparePartHistory.quantity,
                    operationDate: sparePartHistory.operationDate,
                    description: sparePartHistory.description,
                },
            });
            baseResponse.message = 'Equipo creado exitosamente';
            return baseResponse;
        } catch (err) {
            badResponse.message += err.message;
            return badResponse;
        }
    }

    async updateSparePartHistory(sparePart: DtoUpdateSparePartHistory): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.sparePartHistory.update({
                data: {
                    sparePartId: sparePart.sparePartId,
                    operationType: sparePart.operationType,
                    quantity: sparePart.quantity,
                    operationDate: sparePart.operationDate,
                    description: sparePart.description,
                },
                where: {
                    id: sparePart.id
                }
            });
            baseResponse.message = 'Equipo actualizado exitosamente';
            return baseResponse;
        } catch (err) {
            badResponse.message += err.message;
            return badResponse;
        }
    }

    async deleteSparePartHistory(id: number): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.sparePartHistory.delete({
                where: {
                    id: id
                }
            });
            baseResponse.message = 'Equipo eliminado exitosamente';
            return baseResponse;
        } catch (err) {
            badResponse.message += err.message;
            return badResponse;
        }
    }
}
