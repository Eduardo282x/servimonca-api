import { Injectable } from '@nestjs/common';
import { SparePart } from '@prisma/client';
import { badResponse, baseResponse, DtoBaseResponse } from 'src/dtos/base.dto';
import { DtoSparePart, DtoUpdateSparePart } from 'src/dtos/spare-part.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SparepartService {

    constructor(private prismaService: PrismaService) { }

    async getSpareparts(): Promise<SparePart[]> {
        return this.prismaService.sparePart.findMany({
            orderBy: {
                id: 'asc'
            }
        });
    }

    async createSpareparts(sparePart: DtoSparePart): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.sparePart.create({
                data: {
                    sparePartName: sparePart.sparePartName,
                    description: sparePart.description,
                    currentStock: sparePart.currentStock,
                    minimumStock: sparePart.minimumStock,
                    maximumStock: sparePart.maximumStock,
                },
            });
            baseResponse.message = 'Equipo creado exitosamente';
            return baseResponse;
        } catch (err) {
            badResponse.message += err.message;
            return badResponse;
        }
    }

    async updateSpareparts(sparePart: DtoUpdateSparePart): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.sparePart.update({
                data: {
                    sparePartName: sparePart.sparePartName,
                    description: sparePart.description,
                    currentStock: sparePart.currentStock,
                    minimumStock: sparePart.minimumStock,
                    maximumStock: sparePart.maximumStock,
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

    async deleteSpareparts(id: number): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.sparePart.delete({
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
